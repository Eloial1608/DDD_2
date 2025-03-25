import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CalendarNotFound } from '@Events/Calendar/domain/Errors/CalendarNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindCalendarsByCriteriaQuery } from '@Events/Calendar/application/FindByCriteria/FindCalendarsByCriteriaQuery'
import { CalendarCollectionResponse } from '@Events/Calendar/application/CalendarCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { UserResponseBody } from '@Events/User/application/UserResponse'

export class CalendarsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  private user: UserResponseBody | undefined

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = this.decoder.run(req.headers.authorization)

      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const calendarsQuery = new FindCalendarsByCriteriaQuery(criteria.filters, criteria.inFilters, criteria.orderBy, criteria.orderType, criteria.limit, criteria.offset)

      const calendars = await (await this.queryBus.ask<CalendarCollectionResponse>(calendarsQuery)).response

      const calendarsToReturn = []

      for (const calendar of calendars) {
        if (!this.user) {
          this.user = await this.getUser(data.id, calendars[0].communityId)
          if (!this.user) break
        }

        if (calendar.userIds.includes(this.user.id)) calendarsToReturn.push(calendar)
      }

      return res.status(200).json(calendarsToReturn)
    } catch (e) {
      if (e instanceof CalendarNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

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
