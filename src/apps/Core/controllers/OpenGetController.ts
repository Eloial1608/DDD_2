/* eslint-disable padded-blocks */
import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { CreateMetricCommand } from '@Core/Metric/application/Create/CreateMetricCommand'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'

export class OpenGetController {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<void> {
    try {

      const command = new CreateMetricCommand(
        v4(),
        'open',
        new Date()
      )

      await this.commandBus.dispatch(command)

      res.status(200).send()
    } catch (e) {
      res.status(500).send()
    }
  }
}
