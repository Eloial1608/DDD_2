import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'
import { UserResponse } from '@Core/User/application/UserResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Core/SpaceMember/application/SpaceMemberCollectionResponse'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindSpaceByIdQuery } from '@Core/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Core/Space/application/SpaceResponse'
import { DeleteSpaceCommand } from '@Core/Space/application/Delete/DeleteSpaceCommand'

export class SpacesDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      if (!await this.isAdmin(data.id, data.communityId)) {
        if (!req.body.parentId) return res.status(401).send()

        const parentSpaceQuery = new FindSpaceByIdQuery(req.body.parentId)
        const parent = (await this.queryBus.ask<SpaceResponse>(parentSpaceQuery)).response

        if (parent.communityId !== data.communityId) return res.status(401).send()

        const spaceMember = (await this.getSpaceMember(data.id, data.communityId, parent.id)).pop()

        if (!spaceMember || !spaceMember.isModerator || spaceMember.isBanned) return res.status(401).send()
      }

      const command = new DeleteSpaceCommand(
        req.params.id,
        data.communityId
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
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
    const userQuery = new FindUserByIdQuery(id)

    const user = (await this.queryBus.ask<UserResponse>(userQuery)).response

    return user.communityId === communityId && (user.isAdmin || user.isOwner)
  }
}
