import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsBySuffix'
import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { v4 } from 'uuid'

export class JoinSubCommunityPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const tokenData = this.decoder.run(req.headers.authorization)

      const canDo = await this.checkIfCanJoin(req.params.id, tokenData.communityId, tokenData.id)

      if (!canDo.canAccess) return res.status(401).send()

      const command = new CreateUserCommand(
        v4(),
        tokenData.id,
        req.body.name,
        req.body.email,
        req.params.id,
        !!canDo.admin,
        !!canDo.owner
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof CommunityNotFound) res.status(401).send(e.getMessage())
      if (e instanceof UserAlreadyExistsById) return res.status(400).send(e.getMessage())
      if (e instanceof UserAlreadyExistsByEmail) return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async checkIfCanJoin (communityId: string, mainCommunityId: string, userId: string) {
    const communityQuery = new FindCommunityByIdQuery(communityId)

    const community = (await this.queryBus.ask<CommunityResponse>(communityQuery)).response

    if (community.mainId !== mainCommunityId || community.isPrivate || community.membersCount >= community.allowedUsers) return { canAccess: false }

    const parentUser = await this.getUserFromCommunity(userId, community.parentId!)

    if (!parentUser || parentUser.isBanned) return { canAccess: false }

    const mainUser = parentUser.communityId === mainCommunityId ? parentUser : await this.getUserFromCommunity(userId, mainCommunityId)

    if (!mainUser || mainUser.isBanned) return { canAccess: false }

    return {
      admin: parentUser.isAdmin || mainUser.isOwner,
      owner: mainUser.isOwner,
      canAccess: true
    }
  }

  private async getUserFromCommunity (userId: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()
  }
}
