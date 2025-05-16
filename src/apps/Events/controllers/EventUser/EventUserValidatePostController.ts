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
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { FindEventByIdQuery } from '@Events/Event/application/FindById/FindEventByIdQuery'
import { EventResponse } from '@Events/Event/application/EventResponse'
import { EventNotFound } from '@Events/Event/domain/Errors/EventNotFound'
import { ValidateEventUserCommand } from '@Events/EventUser/application/Validate/ValidateEventUserCommand'

export class EventUserValidatePostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const query = new FindEventUsersByCriteriaQuery([
        new Map<string, string>([
          ['field', 'userId'],
          ['operator', '='],
          ['value', req.query.userId as string]
        ]),
        new Map<string, string>([
          ['field', 'eventId'],
          ['operator', '='],
          ['value', req.query.eventId as string]
        ])
      ])

      const response = (await this.queryBus.ask<EventUserCollectionResponse>(query)).response.pop()

      if (!response) return res.status(404).send()

      const eventQuery = new FindEventByIdQuery(response.eventId)

      const event = (await this.queryBus.ask<EventResponse>(eventQuery)).response

      const user = await this.getUser(data.id, event.communityId)

      if (!user) return res.status(401).send()

      if (!user.isAdmin && !user.isOwner) return res.status(401).send()

      const gotUser = await this.getUser(response.userId, event.communityId)

      if (gotUser?.isAdmin || gotUser?.isOwner) return res.status(204).send()

      const command = new ValidateEventUserCommand(response.id)

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof EventUserNotFound) return res.status(404).send()
      if (e instanceof EventNotFound) return res.status(404).send()

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
