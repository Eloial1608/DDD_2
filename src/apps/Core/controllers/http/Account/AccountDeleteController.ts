import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { DeleteAccountCommand } from '@Core/Account/application/Delete/DeleteAccountCommand'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'

export class AccountDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new DeleteAccountCommand(req.params.id)

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      
      if (e instanceof AccountNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
