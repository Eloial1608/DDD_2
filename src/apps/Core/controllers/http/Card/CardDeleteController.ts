import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { DeleteCardCommand } from '@Core/Card/application/Delete/DeleteCardCommand'
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound'

export class CardDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new DeleteCardCommand(req.params.id)

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CardNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
