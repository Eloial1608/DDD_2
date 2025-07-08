import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { FindProjectUsersByCriteriaQuery } from '@Projects/ProjectUser/application/FindByCriteria/FindProjectUsersByCriteriaQuery'
import { ProjectUserCollectionResponse } from '@Projects/ProjectUser/application/ProjectUserCollectionResponse'

export class ProjectUsersGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      if (!req.query.userId || !req.query.projectId) return res.status(400).send()

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

      const query = new FindProjectUsersByCriteriaQuery([
        new Map<string, string>([
          ['field', 'userId'],
          ['operator', '='],
          ['value', user.id]
        ]),
        new Map<string, string>([
          ['field', 'projectId'],
          ['operator', '='],
          ['value', req.query.projectId as string]
        ])
      ])

      const response = (await this.queryBus.ask<ProjectUserCollectionResponse>(query)).response

      return res.status(200).send(response)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
  }
}
