import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Core/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpacesByCriteriaQuery } from '@Core/Space/application/FindByCriteria/FindSpacesByCriteriaQuery'
import { SpaceCollectionResponse } from '@Core/Space/application/SpaceCollectionResponse'
import { AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { CreateSpaceMemberCommand } from '@Core/SpaceMember/application/Create/CreateSpaceMemberCommand'
import { UserResponseBody } from '@Core/User/application/UserResponse'

export class SpaceMemberPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const space = await this.getSpace(req.body.communityId, req.body.spaceId)

      if (!space) return res.status(404).send()

      const user = await this.getUser(data.id, req.body.communityId)

      if (!user) return res.status(404).send()

      if (!user.isAdmin && !user.isOwner) req.body.isModerator = false

      if ([AllowedAccessibilities.PRIVATE, AllowedAccessibilities.HIDDEN].includes(space.accessibility as AllowedAccessibilities)) {
        const status = await this.checkPrivateAccess(user, req.body.communityId, req.body.spaceId)
        if (status) return res.status(status).send()
      }

      const command = new CreateSpaceMemberCommand(
        req.params.id,
        user.id,
        space.id,
        req.body.communityId,
        req.body.isModerator,
        user.id !== req.body.id ? user.id : null,
        user.id !== req.body.id ? new Date() : null
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async checkPrivateAccess (user: UserResponseBody, communityId: string, spaceId: string): Promise<number | undefined> {
    if (!user.isAdmin && !user.isOwner) {
      const spaceMember = await this.getSpaceMember(user.id, communityId, spaceId)

      if (!spaceMember || !spaceMember.isModerator) return 401
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

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response.pop()
  }

  private async getSpace (communityId: string, spaceId: string) {
    const query = new FindSpacesByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', spaceId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<SpaceCollectionResponse>(query)).response.pop()
  }

  private async getUser (userId: string, communityId: string) {
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
