import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateStripeSessionCommand } from '@Stripe/StripeSession/application/Create/CreateStripeSessionCommand'
import { StripeAccountNotFound } from '@Stripe/StripeAccount/domain/Errors/StripeAccountNotFound'
import { StripeProductNotFound } from '@Stripe/StripeProduct/domain/Errors/StripeProductNotFound'
import { StripeSessionAlreadyExists } from '@Stripe/StripeSession/domain/Errors/StripeSessionAlreadyExists'

export class StripeSessionPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const command = new CreateStripeSessionCommand(
        req.params.id,
        data.communityId,
        req.body.productId,
        req.body.userId,
        req.body.successUrl,
        req.body.failUrl
      )
      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })
      if (e instanceof StripeAccountNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof StripeProductNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof StripeSessionAlreadyExists) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
