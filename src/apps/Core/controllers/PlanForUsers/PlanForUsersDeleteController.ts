import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { PlanForUsersAlreadyExists } from '@Core/PlanForUsers/domain/Errors/PlanForUsersAlreadyExistsById'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { DeletePlanForUsersCommand } from '@Core/PlanForUsers/application/Delete/DeletePlanForUsersCommand'

export class PlanForUsersDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const user = await this.getUser(data.id, req.body.communityId)

      if (!user || (!user.isAdmin && !user.isAdmin)) return res.status(401).send()

      const command = new DeletePlanForUsersCommand(
        req.params.id,
        req.body.communityId
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })
      if (e instanceof PlanForUsersAlreadyExists) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async getUser (userId: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()
  }
}
