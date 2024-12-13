import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'
import { AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'
import { UserResponse } from '@Core/User/application/UserResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Core/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpacesByCriteriaQuery } from '@Core/Space/application/FindByCriteria/FindSpacesByCriteriaQuery'
import { SpaceCollectionResponse } from '@Core/Space/application/SpaceCollectionResponse'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'

export class SpaceBySlugGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const slug = req.params.slug

      const space = await this.getSpaceBySlug(slug)

      if (!space) return res.status(404).send()

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!req.headers.authorization) return res.status(401).send()

        const tokenData = this.decoder.run(req.headers.authorization)

        if (tokenData.communityId !== space.communityId) return res.status(404).send()

        if (!this.checkAccessibility(tokenData.id, tokenData.communityId, space.id)) return res.status(401).send()
      }

      return res.status(200).json(space)
    } catch (e) {
      if (e instanceof SpaceNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async checkAccessibility (userId: string, communityId: string, spaceId: string): Promise<boolean> {
    if (await this.isAdmin(userId, communityId)) return true

    const spaceMember = await this.getSpaceMember(userId, communityId, spaceId)

    if (!spaceMember) return false

    return true
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

  private async getSpaceBySlug (slug: string) {
    const query = new FindSpacesByCriteriaQuery([
      new Map<string, string>([
        ['field', 'slug'],
        ['operator', '='],
        ['value', slug]
      ])
    ])

    return (await this.queryBus.ask<SpaceCollectionResponse>(query)).response.pop()
  }

  private async isAdmin (id: string, communityId: string): Promise<boolean> {
    const userQuery = new FindUserByIdQuery(id)

    const user = (await this.queryBus.ask<UserResponse>(userQuery)).response

    return user.communityId === communityId && (user.isAdmin || user.isOwner)
  }
}
