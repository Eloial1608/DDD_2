import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { CreateMetricCommand } from '@Core/Metric/application/Create/CreateMetricCommand'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'

export class ButtonGetController {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<void> {
    try {
      const command = new CreateMetricCommand(
        v4(),
        'button',
        new Date()
      )

      await this.commandBus.dispatch(command)

      res.status(301).redirect('https://pedidos.romanpizza.net/inicio')
    } catch (e) {
      res.status(500).send()
    }
  }
}
