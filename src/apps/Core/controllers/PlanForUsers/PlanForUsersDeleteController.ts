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
import { FindPlanForUsersByCriteriaQuery } from '@Core/PlanForUsers/application/FindByCriteria/FindPlanForUsersByCriteriaQuery'
import { PlanForUsersCollectionResponse } from '@Core/PlanForUsers/application/PlanForUsersCollectionResponse'

export class PlanForUsersDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const findPlanQuery = new FindPlanForUsersByCriteriaQuery([
        new Map<string, string>([
          ['field', 'id'],
          ['operator', '='],
          ['value', req.params.id]
        ])
      ])

      const plan = (await this.queryBus.ask<PlanForUsersCollectionResponse>(findPlanQuery)).response.pop()

      if (!plan) return res.status(404).send()

      const user = await this.getUser(data.id, plan.communityId)

      if (!user || (!user.isAdmin && !user.isAdmin)) return res.status(401).send()

      const command = new DeletePlanForUsersCommand(
        req.params.id,
        plan.communityId
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
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
