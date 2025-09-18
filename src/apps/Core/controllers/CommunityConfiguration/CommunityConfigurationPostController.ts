import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateCommunityConfigurationCommand } from '@Core/CommunityConfiguration/application/Create/CreateCommunityConfigurationCommand'

export class CommunityConfigurationPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      if (data.communityId == null) return res.status(400).send()

      const command = new CreateCommunityConfigurationCommand(
        req.params.id,
        data.communityId,
        req.body.currentTheme || null
      )

      await this.commandBus.dispatch(command)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
  }
}
