import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FormNotFound } from '@Events/Form/domain/Errors/FormNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindFormByIdQuery } from '@Events/Form/application/FindById/FindFormByIdQuery'
import { FormResponse } from '@Events/Form/application/FormResponse'

export class FormGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      await this.decoder.run(req.headers.authorization)

      const query = new FindFormByIdQuery(req.params.id)

      const response = (await this.queryBus.ask<FormResponse>(query)).response

      return res.status(200).json(response)
    } catch (e) {
      console.log(e)
      if (e instanceof FormNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
