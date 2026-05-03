import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateAccountCommand } from '@Core/Account/application/Update/UpdateAccountCommand'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'
import { ThrowErrorForInvalidValue } from '@Core/Account/domain/Errors/ThrowErrorForInvalidValue'

export class AccountPutController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const command = new UpdateAccountCommand(
        req.params.id,
        req.body.iban,
        req.body.balance,
        req.body.type_account
      )

      await this.commandBus.dispatch(command)

      return res.status(200).send()
    } catch (e) {
      if (e instanceof CannotDecode)
        return res.status(401).json({ message: e.getMessage() })

      if (e instanceof AccountNotFound)
        return res.status(404).json({ message: e.getMessage() })

      if (e instanceof ThrowErrorForInvalidValue)
        return res.status(400).json({ message: e.getMessage() })

      if (e instanceof Error)
        return res.status(400).json({ message: e.message })

      return res.status(500).send()
    }
  }
}