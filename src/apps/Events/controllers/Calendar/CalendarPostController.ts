import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CalendarNotFound } from '@Events/Calendar/domain/Errors/CalendarNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateCalendarCommand } from '@Events/Calendar/application/Create/CreateCalendarCommand'

export class CalendarPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      await this.decoder.run(req.headers.authorization)

      const command = new CreateCalendarCommand(
        req.params.id,
        req.body.dateAt,
        req.body.userIds,
        req.body.communityId,
        req.body.content,
        req.body.entityId,
        req.body.entityType
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CalendarNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
