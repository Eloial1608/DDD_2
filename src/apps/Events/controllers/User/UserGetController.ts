import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindCommunityByIdQuery } from '@Events/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Events/Community/application/CommunityResponse'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CommunityNotFound } from '@Events/Community/domain/Errors/CommunityNotFound'
import { UserNotFound } from '@Events/User/domain/Errors/UserNotFound'
import { FindUserByIdQuery } from '@Events/User/application/FindById/FindUserByIdQuery'
import { UserResponse } from '@Events/User/application/UserResponse'

export class UserGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindUserByIdQuery(req.params.id)

      const user = (await this.queryBus.ask<UserResponse>(query)).response

      const communityQuery = new FindCommunityByIdQuery(user.communityId)

      const community = await (await this.queryBus.ask<CommunityResponse>(communityQuery)).response

      if (community.isPrivate) {
        if (!req.headers.authorization) return res.status(401).send()

        const data = await this.decoder.run(req.headers.authorization)

        if ((community.mainId ?? community.id) !== data.communityId) return res.status(401).send()
      }

      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof CommunityNotFound) res.status(401).send(e.getMessage())
      if (e instanceof UserNotFound) res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
