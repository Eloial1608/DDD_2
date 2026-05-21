import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'
import { ThrowErrorForInvalidValue } from '@Core/Account/domain/Errors/ThrowErrorForInvalidValue'
import { UpdateAccountBalanceCommand } from 'src/Contexts/Core/Account/application/UpdateBalance/UpdateAccountBalanceCommand'

export class AccountPatchController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const accountId = req.params.id

      if (!accountId) {
        return res.status(400).json({ message: 'Account ID is required' })
      }

      const command = new UpdateAccountBalanceCommand(
        accountId,
        req.body.balance,
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

      console.error('AccountPatchController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}