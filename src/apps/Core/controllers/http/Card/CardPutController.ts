import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { UpdateCardCommand } from '@Core/Card/application/Update/UpdateCardCommand'
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound'
import { CommandNotRegisteredError } from '@Shared/domain/CommandBus/CommandNotRegisteredError'

export class CardPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: 'Card ID is required' })
      }

      const command = new UpdateCardCommand(
        req.params.id,
        req.body.cardPin,
        req.body.balance,
        req.body.limitCard
      )

      await this.commandBus.dispatch(command)

      return res.status(200).json({
        message: 'Card updated successfully',
        data: { cardId: req.params.id }
      })
    } catch (e) {
      if (e instanceof CardNotFound) {
        return res.status(404).json({ message: 'Card not found' })
      }

      if (e instanceof CommandNotRegisteredError) {
        return res.status(404).json({ message: e.getMessage() })
      }

      if (e instanceof Error) {
        return res.status(400).json({ message: e.message })
      }

      console.error('CardPutController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}