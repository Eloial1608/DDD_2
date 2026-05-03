import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateIsAdminCommand } from '@Core/User/application/UpdateIsAdmin/UpdateIsAdminUserCommand'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

export class UserIsAdminPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new UpdateIsAdminCommand(
        req.params.id,
        req.body.isAdmin
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

