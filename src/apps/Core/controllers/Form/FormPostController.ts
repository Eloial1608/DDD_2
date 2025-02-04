import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateFormCommand } from '@Core/Form/application/Create/CreateFormCommand'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { FormAlreadyExists } from '@Core/Form/domain/Errors/FormAlreadyExists'
import { CommunityAlreadyHasForm } from '@Core/Form/domain/Errors/CommunityAlreadyHasForm'

export class FormPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      if (!await this.isAdmin(data.id, req.body.communityId)) return res.status(401).send()

      const command = new CreateFormCommand(
        req.params.id,
        req.body.name,
        req.body.content,
        true,
        req.body.communityId,
        data.id
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      if (e instanceof FormAlreadyExists) return res.status(400).json({ message: e.getMessage() })

      if (e instanceof CommunityAlreadyHasForm) return res.status(400).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

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
