import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CreateAccountCommand } from '@Core/Account/application/Create/CreateAccountCommand'
import { AccountTypeEnum } from '@Core/Account/domain/ValueObjects/Type_Account'
import { AccountAlreadyExistsById } from '@Core/Account/domain/Errors/AccountAlreadyExistsById'
import { AccountAlreadyExistsByIban } from '@Core/Account/domain/Errors/AccountAlreadyExistsByIban'

export class AccountPostController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const command = new CreateAccountCommand(
        req.user.id,
        req.body.type_account as AccountTypeEnum
      )

      await this.commandBus.dispatch(command)

      return res.status(201).json({
        message: 'Account created successfully',
        data: { account: { userId: req.user.id, type: req.body.type_account } }
      })
    } catch (e) {
      if (e instanceof AccountAlreadyExistsById) {
        return res.status(409).json({ message: e.getMessage() })
      }
      if (e instanceof AccountAlreadyExistsByIban) {
        return res.status(409).json({ message: e.getMessage() })
      }
      console.error('AccountPostController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}