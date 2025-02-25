import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UpdateUserRegisterDataCommand } from '@Core/User/application/UpdateUserRegisterData/UpdateUserRegisterDataCommand'
import { UserResponse } from '@Core/User/application/UserResponse'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'

export class UserRegisterDataPatchController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const userQuery = new FindUserByIdQuery(req.params.id)
      const user = await (await this.queryBus.ask<UserResponse>(userQuery)).response

      if ((!user.isAdmin || !user.isOwner) && user.mainId !== data.id) return res.status(401).send()

      const command = new UpdateUserRegisterDataCommand(
        req.params.id,
        req.body.registerData
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof UserNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}
