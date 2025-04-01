import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindEventByIdQuery } from '@Events/Event/application/FindById/FindEventByIdQuery'
import { EventResponse } from '@Events/Event/application/EventResponse'
import { FindTicketByIdQuery } from '@Events/Ticket/application/FindById/FindTicketByIdQuery'
import { TicketResponse } from '@Events/Ticket/application/TicketResponse'
import { DeleteTicketCommand } from '@Events/Ticket/application/Delete/DeleteTicketCommand'

export class TicketDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const ticketQuery = new FindTicketByIdQuery(req.params.id)

      const ticket = (await this.queryBus.ask<TicketResponse>(ticketQuery)).response

      const eventQuery = new FindEventByIdQuery(ticket.eventId)

      const event = (await this.queryBus.ask<EventResponse>(eventQuery)).response

      const user = await this.getUser(data.id, event.communityId)

      if (!user) return res.status(401).send()

      if (!user.isAdmin && !user.isOwner) {
        if (user.id !== event.userId) return res.status(401).send()
      }

      const command = new DeleteTicketCommand(
        req.params.id
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
  }

  private async getUser (id: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', id]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    return user
  }
}
