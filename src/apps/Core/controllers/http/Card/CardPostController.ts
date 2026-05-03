import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateCardCommand } from '@Core/Card/application/Create/CreateCardCommand'

export class CardPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const command = new CreateCardCommand(
        req.body.type_Card,
        req.body.cardPin,
        req.body.accountId
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {

      if (e instanceof CannotDecode)
        return res.status(401).json({ message: e.getMessage() })

      if (e instanceof Error)
        return res.status(400).json({ message: e.message })

      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}