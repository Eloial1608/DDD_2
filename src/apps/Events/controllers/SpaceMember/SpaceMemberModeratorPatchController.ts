import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Events/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Events/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpaceMemberQuery } from '@Events/SpaceMember/application/Find/FindSpaceMemberQuery'
import { SpaceMemberResponse } from '@Events/SpaceMember/application/SpaceMemberResponse'
import { UpdateSpaceMemberModeratorCommand } from '@Events/SpaceMember/application/UpdateSpaceMemberModerator/UpdateSpaceMemberModeratorCommand'

export class SpaceMemberModeratorPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const spaceMemberQuery = new FindSpaceMemberQuery(req.params.id)

      const spaceMember = await (await this.queryBus.ask<SpaceMemberResponse>(spaceMemberQuery)).response

      if (!spaceMember) return res.status(404).send()

      const user = await this.getUser(data.id, spaceMember.communityId)

      if (!user) return res.status(404).send()

      if (!user.isAdmin && !user.isOwner) {
        if (user.isBanned) return res.status(401).send()

        const member = await this.getSpaceMember(user.id, user.communityId, spaceMember.spaceId)

        if (!member || !member.isModerator) return res.status(401).send()
      }

      const command = new UpdateSpaceMemberModeratorCommand(
        req.params.id,
        user.communityId,
        req.body.isModerator
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
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

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response.pop()
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
