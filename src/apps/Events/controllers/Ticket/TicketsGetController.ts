import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Events/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Events/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { EventResponse, EventResponseBody } from '@Events/Event/application/EventResponse'
import { FindSpaceByIdQuery } from '@Events/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Events/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { EventNotFound } from '@Events/Event/domain/Errors/EventNotFound'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { UserResponseBody } from '@Events/User/application/UserResponse'
import { SpaceMemberResponseBody } from '@Events/SpaceMember/application/SpaceMemberResponse'
import { FindEventUsersByCriteriaQuery } from '@Events/EventUser/application/FindByCriteria/FindEventUsersByCriteriaQuery'
import { EventUserCollectionResponse } from '@Events/EventUser/application/EventUserCollectionResponse'
import { FindTicketsByCriteriaQuery } from '@Events/Ticket/application/FindByCriteria/FindTicketsByCriteriaQuery'
import { TicketCollectionResponse } from '@Events/Ticket/application/TicketCollectionResponse'
import { FindEventByIdQuery } from '@Events/Event/application/FindById/FindEventByIdQuery'

export class TicketsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindTicketsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const tickets = (await this.queryBus.ask<TicketCollectionResponse>(query)).response

      const ticketsToSend = []

      for (const ticket of tickets) {
        const query = new FindEventByIdQuery(ticket.eventId)
        const event = (await this.queryBus.ask<EventResponse>(query)).response
        const p = await this.filterEvent(event, req.headers.authorization as string)
        if (p) ticketsToSend.push(ticket)
      }

      return res.status(200).json(ticketsToSend)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof EventNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterEvent (event: EventResponseBody, token: string) {
    const spaceQuery = new FindSpaceByIdQuery(event.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined
    let user: UserResponseBody | undefined

    if (user == null && token) {
      const data = await this.decoder.run(token)

      const u = await this.getUser(data.id, event.communityId)

      user = u ?? undefined
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!user) return null

      if (!user.isAdmin && !user.isOwner) {
        spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

        if (!spaceMember) return null
      }
    }

    if (event.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
      if (!spaceMember) return this.getEventWithoutContent(event)
      const eventUser = await this.getEventUser(spaceMember.userId, event.id)
      if (!eventUser) return this.getEventWithoutContent(event)
    }

    return event
  }

  private getEventWithoutContent (event: EventResponseBody) {
    return {
      ...event,
      data: undefined,
      isLocked: true
    }
  }

  private async getSpaceMember (userId: string, communityId: string, spaceId: string) {
    const query = new FindSpaceMembersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'spaceId'],
        ['operator', '='],
        ['value', spaceId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response.pop()
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

  private async getEventUser (userId: string, eventId: string) {
    const query = new FindEventUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'eventId'],
        ['operator', '='],
        ['value', eventId]
      ])
    ])

    const user = (await this.queryBus.ask<EventUserCollectionResponse>(query)).response.pop()

    return user
  }
}
