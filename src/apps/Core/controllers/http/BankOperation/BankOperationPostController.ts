import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'
import { ProcessBankOperationCommand } from '@Core/BankOperation/application/Process/ProcessBankOperationCommand'
import { CardNotFound } from 'src/Contexts/Core/Card/domain/Errors/CardNotFound'

export class BankOperationPostController implements Controller {
  constructor(private readonly commandBus: CommandBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const command = new ProcessBankOperationCommand(
        req.body.type,
        req.body.payload
      )

    
      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.error('BankOperationPostController error:', e)

      if (e instanceof CannotDecode)
        return res.status(401).json({ message: e.getMessage() })

      if (e instanceof AccountNotFound)
        return res.status(404).json({ code: e.getCode(), message: e.getMessage() })

      if (e instanceof CardNotFound)
        return res.status(404).json({ code: e.getCode(), message: e.getMessage() })


      if (e instanceof Error)
        return res.status(400).json({ message: e.message })

      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}