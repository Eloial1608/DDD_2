import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { v4 } from 'uuid'
import { CreateCommunityCommand } from '@Core/Community/application/Create/CreateCommunityCommand'
import { ALLOWED_FEATURES } from '@Core/Shared/domain/Community/CommunityAllowedFeatures'
import { CommunityAlreadyExistsById } from '@Core/Community/domain/Errors/CommunityAlreadyExistsById'
import { CommunityAlreadyExistsBySuffix } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySuffix'

export class CommunityPostController implements Controller {
  constructor (private readonly commandBus: CommandBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const homeSpaceId = v4()

      await this.createCommunity(req, homeSpaceId)

      return res.status(201).send()
    } catch (e) {
      console.log(e)
      if (e instanceof CommunityAlreadyExistsById) return res.status(400).send(e.getMessage())
      if (e instanceof CommunityAlreadyExistsBySuffix) return res.status(400).send(e.getMessage())

      return res.status(500).send()
    }
  }

  async createCommunity (req: Request, homeSpaceId: string): Promise<void> {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 14)

    const createCommunityCommand = new CreateCommunityCommand(
      req.params.id,
      req.body.name,
      req.body.slug,
      req.body.parentId,
      req.body.logoUrl,
      req.body.bannerUrl,
      req.body.suffix,
      req.body.color,
      homeSpaceId,
      expiresAt,
      [
        ALLOWED_FEATURES.POST,
        ALLOWED_FEATURES.FORM,
        ALLOWED_FEATURES.FORUM,
        ALLOWED_FEATURES.MEDIA,
        ALLOWED_FEATURES.CHAT
      ],
      5
    )

    await this.commandBus.dispatch(createCommunityCommand)
  }
}
