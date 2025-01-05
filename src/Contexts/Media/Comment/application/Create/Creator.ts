import { CommentRepository } from '@Media/Comment/domain/CommentRepository'
import { Author } from '@Media/Comment/domain/ValueObjects/Author'
import { Content } from '@Media/Comment/domain/ValueObjects/Content'
import { Id } from '@Media/Comment/domain/ValueObjects/Id'
import { MediaId } from '@Media/Comment/domain/ValueObjects/MediaId'
import { UserId } from '@Media/Comment/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Comment } from '@Media/Comment/domain/Comment'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { MediaConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/MediaConfiguration'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'

export class Creator {
  constructor (private readonly repository: CommentRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    mediaId: MediaId,
    userId: UserId,
    content: Content
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserById(userId)

    if (!user) return

    const media = await this.findMediaById(mediaId)
    const space = await this.findSpaceById(media.spaceId)

    if (!(space.configuration as MediaConfiguration['configuration']).allowsComments) return

    const comment = Comment.create(
      id,
      mediaId,
      userId,
      new Author(
        user.id,
        user.mainId,
        user.name,
        user.username,
        user.pictureUrl,
        user.bannerUrl
      ),
      content
    )

    await this.repository.persist(comment)
    await this.eventBus.publish(comment.pullDomainEvents())
  }

  private async findUserById (id: UserId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
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
