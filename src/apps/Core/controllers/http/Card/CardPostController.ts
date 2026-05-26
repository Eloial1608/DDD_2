import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CreateCardCommand } from '@Core/Card/application/Create/CreateCardCommand'

export class CardPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const command = new CreateCardCommand(
        req.body.type_Card,
        req.body.cardPin,
        req.body.accountId,
        false
      )

      await this.commandBus.dispatch(command)

      return res.status(201).json({
        message: 'Card created successfully',
        data: { card: { userId: req.user.id, type: req.body.type_Card } }
      })
    } catch (e) {
      if (e instanceof Error) {
        return res.status(400).json({ message: e.message })
      }
      console.error('CardPostController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}