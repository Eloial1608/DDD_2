import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { SpaceResponse } from '@Projects/Space/application/SpaceResponse'
import { FindSpaceByIdQuery } from '@Projects/Space/application/FindById/FindSpaceByIdQuery'
import { FindSpaceMembersByCriteriaQuery } from '@Projects/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Projects/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { CreateProjectCommand } from '@Projects/Project/application/Create/CreateProjectCommand'

export class ProjectPostController implements Controller {
  constructor (
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const user = await this.getUser(data.id, req.body.communityId)

      if (!user) return res.status(401).send()

      const leadUser = await this.getUser(req.body.leadUser, req.body.communityId)

      if (!leadUser) return res.status(404).send()

      const spaceQuery = new FindSpaceByIdQuery(req.body.spaceId)

      const space = (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response

      if (!space) return res.status(404).send()

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user.isAdmin && !user.isOwner) {
          const spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      const command = new CreateProjectCommand(
        req.params.id,
        req.body.title,
        req.body.description,
        req.body.bannerUrl,
        leadUser.id,
        req.body.startDate,
        req.body.endDate,
        user.communityId,
        space.id,
        user.id
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
  }

  private async getSpaceMember (userId: string, communityId: string, spaceId: string) {
    const query = new FindSpaceMembersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'spaceId'],
        ['operator', '='],
        ['value', spaceId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response
  }

  private async getUser (id: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', id]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    return user
  }
}
