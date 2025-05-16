import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Events/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Events/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindEventByIdQuery } from '@Events/Event/application/FindById/FindEventByIdQuery'
import {
  EventResponse,
  EventResponseBody
} from '@Events/Event/application/EventResponse'
import { FindSpaceByIdQuery } from '@Events/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Events/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { EventNotFound } from '@Events/Event/domain/Errors/EventNotFound'
import { FindEventUsersByCriteriaQuery } from '@Events/EventUser/application/FindByCriteria/FindEventUsersByCriteriaQuery'
import { EventUserCollectionResponse } from '@Events/EventUser/application/EventUserCollectionResponse'
import { SpaceMemberResponseBody } from '@Events/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Events/User/application/UserResponse'
import jwt from 'jsonwebtoken'

export class EventMeetTokenGetController implements Controller {
  constructor (
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindEventByIdQuery(req.params.id)

      const event = (await this.queryBus.ask<EventResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(event.spaceId)

      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery))
        .response
      let spaceMember: SpaceMemberResponseBody | undefined
      let user: UserResponseBody | undefined

      if (req.headers.authorization) {
        const data = await this.decoder.run(req.headers.authorization)

        user = await this.getUser(data.id, event.communityId)
      }

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user) return res.status(401).send()

        if (!user.isAdmin && !user.isOwner) {
          spaceMember = await this.getSpaceMember(
            user.id,
            user.communityId,
            space.id
          )

          if (!spaceMember) return res.status(401).send()
        }
      }

      if (
        event.isPaid &&
        !user?.isAdmin && !user?.isOwner &&
        !spaceMember?.isModerator
      ) {
        if (!spaceMember) {
          return res.status(200).json(this.getEventWithoutContent(event))
        }
        const eventUser = await this.getEventUser(spaceMember.userId, event.id)
        if (!eventUser) {
          return res.status(200).json(this.getEventWithoutContent(event))
        }
      }

      const token = this.createMeetToken(user!, event)

      if (!token) return res.status(401).send()

      return res.status(200).json({ token })
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof EventNotFound) { return res.status(404).send(e.getMessage()) }

      return res.status(500).send()
    }
  }

  private createMeetToken (user: UserResponseBody, event: EventResponseBody) {
    const room = (event.data as { url: string })?.url

    if (!room) return null

    console.log(process.env.MEET_PRIVATE_KEY!.replace(/\\n/g, '\n'))

    return jwt.sign(
      {
        alg: 'RS256',
        kid: 'vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe/4f4910',
        typ: 'JWT',
        aud: 'jitsi',
        context: {
          user: {
            id: user.mainId,
            name: user.name,
            avatar: user.pictureUrl,
            moderator: user.isAdmin || user.isOwner
          },
          features: {
            livestreaming: 'false',
            'outbound-call': 'false',
            transcription: 'false',
            recording: 'false'
          },
          room
        }
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
      },
      process.env.MEET_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      { algorithm: 'RS256' }
    )
  }

  private getEventWithoutContent (event: EventResponseBody) {
    return {
      ...event,
      data: undefined,
      isLocked: true
    }
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

    const user = (
      await this.queryBus.ask<EventUserCollectionResponse>(query)
    ).response.pop()

    return user
  }

  private async getSpaceMember (
    userId: string,
    communityId: string,
    spaceId: string
  ) {
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

    return (
      await this.queryBus.ask<SpaceMemberCollectionResponse>(query)
    ).response.pop()
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

    const user = (
      await this.queryBus.ask<UserCollectionResponse>(query)
    ).response.pop()

    return user
  }
}
