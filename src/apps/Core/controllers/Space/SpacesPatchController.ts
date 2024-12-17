import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Core/SpaceMember/application/SpaceMemberCollectionResponse'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindSpaceByIdQuery } from '@Core/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Core/Space/application/SpaceResponse'
import { UpdateSpaceCommand } from '@Core/Space/application/Update/UpdateSpaceCommand'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'

export class SpacesPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const spaceQuery = new FindSpaceByIdQuery(req.params.id)
      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response

      if (!await this.isAdmin(data.id, space.communityId)) {
        if (!req.body.parentId) return res.status(401).send()

        const parentSpaceQuery = new FindSpaceByIdQuery(req.body.parentId)
        const parent = (await this.queryBus.ask<SpaceResponse>(parentSpaceQuery)).response

        if (parent.communityId !== space.communityId) return res.status(401).send()

        const spaceMember = (await this.getSpaceMember(data.id, parent.communityId, parent.id)).pop()

        if (!spaceMember || !spaceMember.isModerator || spaceMember.isBanned) return res.status(401).send()
      }

      const command = new UpdateSpaceCommand(
        req.params.id,
        req.body.name,
        req.body.slug,
        req.body.parentId,
        req.body.icon,
        req.body.headerUrl,
        req.body.accessibility,
        req.body.price,
        data.communityId
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof SpaceNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

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

  private async isAdmin (id: string, communityId: string): Promise<boolean> {
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

    return !!user && (user.isAdmin || user.isOwner)
  }
}
