import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'

export class MyselfGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)
  

      const query = new FindUserByIdQuery(data.id)

      const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

      return res.status(200).json(user)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
