import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CreateLikeCommand } from '@Threads/Like/application/Create/CreateLikeCommand'
import { FindThreadByIdQuery } from '@Threads/Thread/application/FindById/FindThreadByIdQuery'
import { ThreadResponse } from '@Threads/Thread/application/ThreadResponse'
import { LikeNotFound } from '@Threads/Like/domain/Errors/LikeNotFound'

export class LikePostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const thread = await this.getThread(req.body.threadId)

      const user = await this.getUser(data.id, thread.communityId)

      if (!user) return res.status(401).send()

      const command = new CreateLikeCommand(req.params.id, thread.id, user.id)

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ThreadNotFound) return res.status(404).send(e.getMessage())
      if (e instanceof LikeNotFound) return res.status(404).send(e.getMessage())

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

  private async getThread (threadId: string) {
    const query = new FindThreadByIdQuery(threadId)

    const thread = (await this.queryBus.ask<ThreadResponse>(query)).response

    return thread
  }
}
