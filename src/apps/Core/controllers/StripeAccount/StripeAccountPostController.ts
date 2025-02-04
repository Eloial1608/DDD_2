import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { Controller } from '../@types/Controller'
import { Request, Response } from 'express'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { CreateStripeAccountCommand } from '@Stripe/StripeAccount/application/Create/CreateStripeAccountCommand'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { StripeAccountAlreadyExists } from '@Stripe/StripeAccount/domain/Errors/StripeAccountAlreadyExists'

export class StripeAccountPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      if (!await this.isAdmin(data.id, data.communityId)) return res.status(401).send()

      const command = new CreateStripeAccountCommand(data.communityId, req.body.apiKey)
      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })
      if (e instanceof StripeAccountAlreadyExists) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async isAdmin (id: string, communityId: string): Promise<boolean> {
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

    return !!user && (user.isAdmin || user.isOwner)
  }
}
