import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateAccountCommand,  } from '@Core/Account/application/Create/CreateAccountCommand'
import { AccountTypeEnum } from '@Core/Account/domain/ValueObjects/Type_Account'

export class AccountPostController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new CreateAccountCommand(
        req.body.userId,
        req.body.type_account as AccountTypeEnum
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)

      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: e.getMessage() })
      }


      return res.status(500).send()
    }
  }
}