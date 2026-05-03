import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { UpdatePasswordCommand } from '@Core/User/application/UpdatePassword/UpdatePasswordCommand'

export class UserPasswordPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new UpdatePasswordCommand(
        req.params.id,
        req.body.password
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      console.log(e)
      if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() }) 

      return res.status(500).send()
    }
  }
}

