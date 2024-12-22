import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CalendarNotFound } from '@Core/Calendar/domain/Errors/CalendarNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindCalendarByIdQuery } from '@Core/Calendar/application/FindById/FindCalendarByIdQuery'
import { CalendarResponse } from '@Core/Calendar/application/CalendarResponse'
import { DeleteCalendarCommand } from '@Core/Calendar/application/Delete/DeleteCalendarCommand'

export class CalendarDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const calendarQuery = new FindCalendarByIdQuery(req.params.id)
      const calendar = await (await this.queryBus.ask<CalendarResponse>(calendarQuery)).response

      if (!calendar.userIds.includes(data.id)) return res.status(401).send()

      const command = new DeleteCalendarCommand(
        req.params.id,
        data.communityId
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
