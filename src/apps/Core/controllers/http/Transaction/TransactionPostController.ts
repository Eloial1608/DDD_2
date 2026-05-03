import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'
import { InsufficientFunds } from '@Core/Transaction/domain/Errors/InsufficientFunds'
import { CreateTransactionCommand } from '@Core/Transaction/application/Create/CreateTransactionCommand'

export class TransactionPostController implements Controller {
  constructor (
    private readonly commandBus: CommandBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) {
        return res.status(401).send()
      }

      await this.decoder.run(req.headers.authorization)

      const {
        type,
        fromAccountId,
        toAccountId,
        amount,
        concept,
        reference
      } = req.body

      const command = new CreateTransactionCommand(
        type,
        amount,
        fromAccountId,
        toAccountId,
        concept,
        reference
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()

    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).send(e.getMessage())
      }

      if (e instanceof AccountNotFound) {
        return res.status(404).send(e.getMessage())
      }

      if (e instanceof InsufficientFunds) {
        return res.status(400).send(e.getMessage())
      }

      if (e instanceof Error) {
        return res.status(400).send(e.message)
      }

      return res.status(500).send()
    }
  }
}