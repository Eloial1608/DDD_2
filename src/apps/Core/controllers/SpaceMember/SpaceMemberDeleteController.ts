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
import { DeleteSpaceMemberCommand } from '@Core/SpaceMember/application/Delete/DeleteSpaceMemberCommand'
import { FindSpaceMemberQuery } from '@Core/SpaceMember/application/Find/FindSpaceMemberQuery'
import { SpaceMemberResponse } from '@Core/SpaceMember/application/SpaceMemberResponse'

export class SpaceMemberDeleteController implements Controller {
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

      if (user.mainId !== data.id) {
        if (!user.isAdmin && !user.isOwner) {
          if (user.isBanned) return res.status(401).send()

          const member = await this.getSpaceMember(user.id, user.communityId, spaceMember.spaceId)

          if (!member || !member.isModerator) return res.status(401).send()
        }
      }

      const command = new DeleteSpaceMemberCommand(
        req.params.id,
        user.communityId
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
