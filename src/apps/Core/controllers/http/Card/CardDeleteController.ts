import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { DeleteCardCommand } from '@Core/Card/application/Delete/DeleteCardCommand'
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound'

export class CardDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: 'Card ID is required' })
      }

      const command = new DeleteCardCommand(req.params.id)

      await this.commandBus.dispatch(command)

      return res.status(200).json({ message: 'Card deleted successfully' })
    } catch (e) {
      if (e instanceof CardNotFound) {
        return res.status(404).json({ message: 'Card not found' })
      }

      console.error('CardDeleteController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
