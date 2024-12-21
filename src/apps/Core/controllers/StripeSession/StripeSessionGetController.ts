import { Controller } from '../@types/Controller'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { StripeAccountNotFound } from '@Stripe/StripeAccount/domain/Errors/StripeAccountNotFound'
import { StripeProductNotFound } from '@Stripe/StripeProduct/domain/Errors/StripeProductNotFound'
import { StripeSessionAlreadyExists } from '@Stripe/StripeSession/domain/Errors/StripeSessionAlreadyExists'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindStripeSessionByIdQuery } from '@Stripe/StripeSession/application/FindById/FindStripeSessionByIdQuery'
import { StripeSessionResponse } from '@Stripe/StripeSession/application/StripeSessionResponse'

export class StripeSessionGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const query = new FindStripeSessionByIdQuery(req.params.id)

      const session = (await this.queryBus.ask<StripeSessionResponse>(query)).response

      if (session.accountId !== data.communityId) return res.status(404).send()

      return res.status(200).json(session)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })
      if (e instanceof StripeAccountNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof StripeProductNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof StripeSessionAlreadyExists) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
