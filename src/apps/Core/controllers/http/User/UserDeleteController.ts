import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { DeleteUserCommand } from '@Core/User/application/Delete/DeleteUserCommand'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

export class UserDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new DeleteUserCommand(req.params.id)

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      console.log(e)
      if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
