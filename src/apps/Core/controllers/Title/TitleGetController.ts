import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'
import { FindTitleByIdQuery } from '@Core/Title/application/FindById/FindTitleByIdQuery'
import { TitleResponse } from '@Core/Title/application/TitleResponse'

export class TitleGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindTitleByIdQuery(req.params.id)

      const title = (await this.queryBus.ask<TitleResponse>(query)).response

      const communityQuery = new FindCommunityByIdQuery(title.communityId)

      const community = await (await this.queryBus.ask<CommunityResponse>(communityQuery)).response

      if (community.isPrivate) {
        if (!req.headers.authorization) return res.status(401).send()

        const data = await this.decoder.run(req.headers.authorization)

        if ((community.mainId ?? community.id) !== data.communityId) return res.status(401).send()
      }

      return res.status(200).json(title)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof CommunityNotFound) res.status(401).send(e.getMessage())
      if (e instanceof TitleNotFound) res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
