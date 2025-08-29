import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CreateTitleCommand } from '@Core/Title/application/Create/CreateTitleCommand'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TitleAlreadyExistsById } from '@Core/Title/domain/Errors/TitleAlreadyExistsById'
//import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
//import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { TitleAlreadyExistsByName } from '@Core/Title/domain/Errors/TitleAlreadyExistsByName'
import { FindUsersByCriteriaQuery } from '@Chat/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Chat/User/application/UserCollectionResponse'

export class TitlePostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const tokenData = this.decoder.run(req.headers.authorization)

      if (!await this.isAdmin(tokenData.id, tokenData.communityId)) return res.status(401).send()


      /*const communityQuery = new FindCommunityByIdQuery(tokenData.communityId)
      const community = (await this.queryBus.ask<CommunityResponse>(communityQuery)).response
      if (community.membersCount >= community.allowedTitles) return res.status(401).send()*/

      if (!req.body.name) return res.status(400).send()

      const command = new CreateTitleCommand(
        req.params.id,
        req.body.name,
        tokenData.communityId,
        req.body.titleImageUrl
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof TitleAlreadyExistsById) return res.status(400).send(e.getMessage())
      if (e instanceof TitleAlreadyExistsByName) return res.status(400).send(e.getMessage())
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
}
