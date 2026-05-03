import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindAcountByIdQuery } from '@Core/Account/application/FindById/FindAccountByIdQuery'
import { AccountResponse } from '@Core/Account/application/AccountResponse'

export class FindByIdAccountController implements Controller {
  constructor (
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send()
      }

      const data = await this.decoder.run(req.headers.authorization)

      const query = new FindAcountByIdQuery(data.id)

      const accountResponse = await this.queryBus.ask<AccountResponse>(query)

      return res.status(200).json(accountResponse.response)

    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).send(e.getMessage())
      }

      return res.status(500).send()
    }
  }
}