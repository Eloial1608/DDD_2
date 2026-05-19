import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsByEmail'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserAlreadyExistsByIdentityDoc } from '@Core/User/domain/Errors/UserAlreadyExistsByIdentityDoc'
import { UpdateUserCommand } from '@Core/User/application/Update/UpdaterUserCommand'
import { InvalidDNIchecksum } from '@Core/User/domain/Errors/InvalidDNIchecksum'
import { InvalidDNIFormat } from '@Core/User/domain/Errors/InvalidDNIFormat'
import { CommandNotRegisteredError } from '@Shared/domain/CommandBus/CommandNotRegisteredError'

export class MyselfPutController implements Controller {
  constructor (
    private readonly commandBus: CommandBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' })
      }

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader

      const data = await this.decoder.run(token)

      if (!data?.id) {
        return res.status(401).json({ message: 'Invalid token payload' })
      }

      const command = new UpdateUserCommand(
        data.id,
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

      return res.status(200).json({ message: 'User updated successfully' })
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })
      if (e instanceof UserAlreadyExistsById) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof UserAlreadyExistsByEmail) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof UserAlreadyExistsByIdentityDoc) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof InvalidDNIFormat) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof InvalidDNIchecksum) return res.status(409).json({ message: e.getMessage() })
      if (e instanceof CommandNotRegisteredError) return res.status(404).json({ message: e.getMessage() })

      console.error('Error en MyselfPutController:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}
