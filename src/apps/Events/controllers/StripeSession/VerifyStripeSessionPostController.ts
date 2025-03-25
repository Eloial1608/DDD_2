import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { StripeAccountNotFound } from '@Stripe/StripeAccount/domain/Errors/StripeAccountNotFound'
import { VerifyStripeSessionCommand } from '@Stripe/StripeSession/application/Verify/VerifyStripeSessionCommand'
import { StripeSessionNotFound } from '@Stripe/StripeSession/domain/Errors/StripeSessionNotFound'

export class VerifyStripeSessionPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      await this.decoder.run(req.headers.authorization)

      const command = new VerifyStripeSessionCommand(req.params.id)
      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })
      if (e instanceof StripeAccountNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof StripeSessionNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
