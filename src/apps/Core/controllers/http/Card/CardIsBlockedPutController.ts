import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound'
import { CommandNotRegisteredError } from '@Shared/domain/CommandBus/CommandNotRegisteredError'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateIsBlockedCommand } from 'src/Contexts/Core/Card/application/UpdateIsBlocked/UpdateIsBlockedCommand'
import { FindCardByIdQuery } from '@Core/Card/application/FindById/FindCardByIdQuery'
import { CardResponse } from '@Core/Card/application/CardResponse'

export class CardIsBlockedPutController implements Controller {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const command = new UpdateIsBlockedCommand(
        req.params.id,
        req.body.isBlocked
      )

      await this.commandBus.dispatch(command)
      const query = new FindCardByIdQuery(req.params.id)
      const cardResponse = await this.queryBus.ask<CardResponse>(query)

      return res.status(200).json(cardResponse.response)
    } catch (e) {
      console.log(e)

      if (e instanceof CannotDecode)
        return res.status(401).json({ message: e.getMessage() })

      if (e instanceof CardNotFound)
        return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CommandNotRegisteredError)
        return res.status(404).json({ message: e.getMessage() })

      if (e instanceof Error)
        return res.status(400).json({ message: e.message })

      return res.status(500).send()
    }
  }
}
