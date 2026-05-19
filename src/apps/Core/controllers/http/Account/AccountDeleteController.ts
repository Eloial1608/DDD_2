import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { DeleteAccountCommand } from '@Core/Account/application/Delete/DeleteAccountCommand'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'

export class AccountDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const accountId = req.params.id

      if (!accountId) {
        return res.status(400).json({ message: 'Account ID is required' })
      }

      const command = new DeleteAccountCommand(accountId)

      await this.commandBus.dispatch(command)

      return res.status(200).json({
        message: 'Account deleted successfully'
      })
    } catch (e) {
      if (e instanceof AccountNotFound) {
        return res.status(404).json({ message: 'Account not found' })
      }

      console.error('AccountDeleteController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}