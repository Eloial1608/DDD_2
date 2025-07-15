import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CommunityAlreadyExistsById } from '@Core/Community/domain/Errors/CommunityAlreadyExistsById'
import { CommunityAlreadyExistsBySuffix } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySuffix'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CommunityAlreadyExistsByDomain } from '@Core/Community/domain/Errors/CommunityAlreadyExistsByDomain'
import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'
import { UpdateCommunitySpaceOrderedIdsCommand } from '@Core/Community/application/UpdateSpaceOrderedIds/UpdateCommunitySpaceOrderedIdsCommand'

export class CommunitySpaceOrderedIdsPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const user = await this.getUser(data.id, req.params.id)

      if (!user?.isAdmin && !user?.isOwner) return res.status(401).send()

      const command = new UpdateCommunitySpaceOrderedIdsCommand(
        req.params.id,
        this.formatOrderedIds(req.body.spaceOrderedIds)
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      console.log(e)
      if (e instanceof InvalidArgumentError) return res.status(400).send(e.getMessage())
      if (e instanceof CommunityAlreadyExistsById) return res.status(400).send(e.getMessage())
      if (e instanceof CommunityAlreadyExistsBySuffix) return res.status(400).send(e.getMessage())
      if (e instanceof CommunityAlreadyExistsByDomain) return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
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

  private formatOrderedIds (orderedIds: string[]): string {
    try {
      return JSON.stringify(orderedIds)
    } catch (e) {
      console.log(e)
      throw new InvalidArgumentError(`The ordered Ids ${orderedIds} format isn't supported`)
    }
  }
}
