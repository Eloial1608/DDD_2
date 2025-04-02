import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindEventUsersByCriteriaQuery } from '@Events/EventUser/application/FindByCriteria/FindEventUsersByCriteriaQuery'
import { EventUserCollectionResponse } from '@Events/EventUser/application/EventUserCollectionResponse'
import { EventUserNotFound } from '@Events/EventUser/domain/Errors/EventUserNotFound'

export class EventUserGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      if (!req.query.userId || !req.query.eventId) return res.status(400).send()

      const userQuery = new FindUsersByCriteriaQuery([
        new Map<string, string>([
          ['field', 'id'],
          ['operator', '='],
          ['value', req.query.userId as string]
        ])
      ])

      const user = (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()

      if (!user) return res.status(401).send()

      if (user.mainId !== data.id && !user.isAdmin && !user.isOwner) return res.status(401).send()

      const query = new FindEventUsersByCriteriaQuery([
        new Map<string, string>([
          ['field', 'userId'],
          ['operator', '='],
          ['value', user.id]
        ]),
        new Map<string, string>([
          ['field', 'eventId'],
          ['operator', '='],
          ['value', req.query.eventId as string]
        ])
      ])

      const response = (await this.queryBus.ask<EventUserCollectionResponse>(query)).response.pop()

      return res.status(200).send(response)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof EventUserNotFound) return res.status(404).send()

      return res.status(500).send()
    }
  }
}
