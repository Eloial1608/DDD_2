import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound'
import { CommandNotRegisteredError } from '@Shared/domain/CommandBus/CommandNotRegisteredError'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateCardLimitCommand } from '@Core/Card/application/UpdateLimit/UpdateCardLimitCommand'

export class LimitCardPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const command = new UpdateCardLimitCommand(
        req.params.id,
        req.body.limit
      )

      await this.commandBus.dispatch(command)

      return res.status(200).send()
    } catch (e) {
      console.log(e)

      if (e instanceof CannotDecode)
        return res.status(401).json({ message: e.getMessage() })

      if (e instanceof CardNotFound)
        return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CommandNotRegisteredError)
        return res.status(404).json({ message: e.getMessage() })

      if (e instanceof Error)
        return res.status(400).json({ message: e.message })

      return res.status(500).send()
    }
  }
}