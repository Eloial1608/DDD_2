import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CommunityAlreadyExistsById } from '@Events/Community/domain/Errors/CommunityAlreadyExistsById'
import { CommunityAlreadyExistsBySuffix } from '@Events/Community/domain/Errors/CommunityAlreadyExistsBySuffix'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { UpdateCommunityCommand } from '@Events/Community/application/Update/UpdateCommunityCommand'
import { CommunityAlreadyExistsByDomain } from '@Events/Community/domain/Errors/CommunityAlreadyExistsByDomain'

export class CommunityPutController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const user = await this.getUser(data.id, req.params.id)

      if (!user?.isAdmin && !user?.isOwner) return res.status(401).send()

      const command = new UpdateCommunityCommand(
        req.params.id,
        req.body.name,
        req.body.slug,
        req.body.domain,
        req.body.about,
        req.body.isPrivate,
        req.body.isRegisterOpen,
        req.body.logoUrl,
        req.body.bannerUrl,
        req.body.suffix,
        req.body.color
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      console.log(e)
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
}
