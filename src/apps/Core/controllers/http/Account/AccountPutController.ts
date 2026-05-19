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
      const accountId = req.params.id

      if (!accountId) {
        return res.status(400).json({ message: 'Account ID is required' })
      }

      const command = new UpdateAccountCommand(
        accountId,
        req.body.iban,
        req.body.balance,
        req.body.type_account
      )

      await this.commandBus.dispatch(command)

      return res.status(200).json({
        message: 'Account updated successfully',
        data: { account: { id: accountId } }
      })
    } catch (e) {
      if (e instanceof CannotDecode)
        return res.status(401).json({ message: e.getMessage() })

      if (e instanceof AccountNotFound)
        return res.status(404).json({ message: 'Account not found' })

      if (e instanceof ThrowErrorForInvalidValue)
        return res.status(400).json({ message: e.getMessage() })

      if (e instanceof Error)
        return res.status(400).json({ message: e.message })

      console.error('AccountPutController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}