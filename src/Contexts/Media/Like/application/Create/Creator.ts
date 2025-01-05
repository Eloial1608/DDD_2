import { Like } from '@Media/Like/domain/Like'
import { LikeRepository } from '@Media/Like/domain/LikeRepository'
import { Id } from '@Media/Like/domain/ValueObjects/Id'
import { MediaId } from '@Media/Like/domain/ValueObjects/MediaId'
import { UserId } from '@Media/Like/domain/ValueObjects/UserId'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { MediaConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/MediaConfiguration'

export class Creator {
  constructor (private readonly repository: LikeRepository, private readonly queryBus: QueryBus, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    mediaId: MediaId,
    userId: UserId
  ) {
    const like = await this.repository.find(id)

    if (like) return

    const media = await this.findMediaById(mediaId)
    const space = await this.findSpaceById(media.spaceId)

    if (!(space.configuration as MediaConfiguration['configuration']).allowsLikes) return

    const created = Like.create(id, mediaId, userId)

    await this.repository.persist(created)
    await this.eventBus.publish(created.pullDomainEvents())
  }

  private async findMediaById (mediaId: MediaId) {
    const query = new FindMediaByIdQuery(mediaId.valueOf())

    return (await this.queryBus.ask<MediaResponse>(query)).response
  }

  private async findSpaceById (id: string) {
    const spaceQuery = new FindSpaceByIdQuery(id)

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
