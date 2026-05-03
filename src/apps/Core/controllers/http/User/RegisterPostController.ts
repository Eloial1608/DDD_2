import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateUserCommand } from '@Core/User/application/Create/CreateUserCommand'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsByEmail'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByIdentityDoc } from '@Core/User/domain/Errors/UserAlreadyExistsByIdentityDoc'

export class RegisterPostController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new CreateUserCommand(
        
        req.body.name,
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.isAdmin,
        req.body.identityDocType,
        req.body.identityDocNumber,
        req.body.companyName,
        req.body.phoneNumber,
        req.body.birthDate,
        req.body.address,
        req.body.city,
        req.body.zipCode
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })
      if (e instanceof UserAlreadyExistsById) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof UserAlreadyExistsByEmail) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof UserAlreadyExistsByIdentityDoc) return res.status(409).json({ message: e.getMessage() })

      return res.status(500).send()
      
    }
  }
}