import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Media/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Media/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateMediaCommand } from '@Media/Media/application/Create/CreateMediaCommand'
import { CreateContentCommand } from '@Media/Content/application/Create/CreateContentCommand'
import { DeleteMediaCommand } from '@Media/Media/application/Delete/DeleteMediaCommand'
import { DeleteContentCommand } from '@Media/Content/application/Delete/DeleteContentCommand'

export class MediaPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    let mediaCreated = false
    const createdContent = []
    let user
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      user = await this.getUser(data.id, req.body.communityId)

      if (!user) return res.status(401).send()

      if (!user.isAdmin && !user.isOwner) {
        const spaceMember = await this.getSpaceMember(user.id, user.communityId, req.body.spaceId)

        if (!spaceMember) return res.status(401).send()
      }

      if (!req.body.content || !Array.isArray(req.body.content)) return res.status(400).send()

      const command = new CreateMediaCommand(
        req.params.id,
        user.communityId,
        user.id,
        req.body.spaceId,
        req.body.title,
        req.body.bannerUrl,
        req.body.isPaid,
        req.body.price
      )

      await this.commandBus.dispatch(command)

      mediaCreated = true

      for (const content of req.body.content) {
        const createContentCommand = new CreateContentCommand(
          content.id,
          user.communityId,
          req.params.id,
          content.type,
          content.url
        )

        await this.commandBus.dispatch(createContentCommand)

        createdContent.push(content.id)
      }

      return res.status(201).send()
    } catch (e) {
      console.log(e)

      if (mediaCreated) {
        const command = new DeleteMediaCommand(req.params.id, user!.communityId, user!.id)
        await this.commandBus.dispatch(command)

        if (createdContent.length > 0) {
          for (const content of createdContent) {
            const command = new DeleteContentCommand(
              content,
              user!.communityId
            )

            await this.commandBus.dispatch(command)
          }
        }
      }

      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
  }

  private async getSpaceMember (userId: string, communityId: string, spaceId: string) {
    const query = new FindSpaceMembersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'spaceId'],
        ['operator', '='],
        ['value', spaceId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response
  }

  private async getUser (id: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', id]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    return user
  }
}
