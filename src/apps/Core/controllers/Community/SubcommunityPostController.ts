import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CommunityAlreadyExistsById } from '@Core/Community/domain/Errors/CommunityAlreadyExistsById'
import { CommunityAlreadyExistsBySuffix } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySuffix'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CreateSubcommunityCommand } from '@Core/Community/application/CreateSubcommunity/CreateSubcommunityCommand'
import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { v4 } from 'uuid'

export class SubcommunityPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.body.parentId) return res.status(400).send()
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const community = await this.getCommunity(req.body.parentId)

      if (!await this.isAdmin(data.id, community.id)) return res.status(401).send()

      await this.createCommunity(req)
      await this.copyUser(data.id, community.id, req.params.id)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CommunityAlreadyExistsById) return res.status(400).send(e.getMessage())
      if (e instanceof CommunityAlreadyExistsBySuffix) return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
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

  private async getCommunity (communityId: string) {
    const query = new FindCommunityByIdQuery(communityId)

    return (await this.queryBus.ask<CommunityResponse>(query)).response
  }

  async createCommunity (req: Request): Promise<void> {
    const createCommunityCommand = new CreateSubcommunityCommand(
      req.params.id,
      req.body.name,
      req.body.slug,
      req.body.about,
      req.body.parentId,
      req.body.logoUrl,
      req.body.bannerUrl
    )

    await this.commandBus.dispatch(createCommunityCommand)
  }

  async copyUser (userId: string, parentCommunityId: string, currentCommunityId: string): Promise<void> {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', parentCommunityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    if (!user) return

    const command = new CreateUserCommand(
      v4(),
      user.mainId,
      user.name,
      user.email,
      currentCommunityId,
      user.isAdmin,
      user.isOwner
    )

    await this.commandBus.dispatch(command)
  }
}
