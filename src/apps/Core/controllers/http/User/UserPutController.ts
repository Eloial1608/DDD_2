import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsByEmail'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByIdentityDoc } from '@Core/User/domain/Errors/UserAlreadyExistsByIdentityDoc'
import { UpdateUserCommand } from '@Core/User/application/Update/UpdaterUserCommand'
import { InvalidDNIchecksum } from '@Core/User/domain/Errors/InvalidDNIchecksum'
import { InvalidDNIFormat } from '@Core/User/domain/Errors/InvalidDNIFormat'
import { CommandNotRegisteredError } from '@Shared/domain/CommandBus/CommandNotRegisteredError'

export class UserPutController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const command = new UpdateUserCommand(
        req.params.id,
        req.body.name,
        req.body.username,
        req.body.email,
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
      if (e instanceof InvalidDNIFormat) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof InvalidDNIchecksum) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof CommandNotRegisteredError) return res.status(404).json({ message: e.getMessage() })
      return res.status(500).send()
      
    }
  }
}