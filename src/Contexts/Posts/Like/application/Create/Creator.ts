import { Like } from '@Posts/Like/domain/Like'
import { LikeRepository } from '@Posts/Like/domain/LikeRepository'
import { Id } from '@Posts/Like/domain/ValueObjects/Id'
import { PostId } from '@Posts/Like/domain/ValueObjects/PostId'
import { UserId } from '@Posts/Like/domain/ValueObjects/UserId'
import { FindPostByIdQuery } from '@Posts/Post/application/FindById/FindPostByIdQuery'
import { PostResponse } from '@Posts/Post/application/PostResponse'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { PostsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/PostsConfiguration'

export class Creator {
  constructor (private readonly repository: LikeRepository, private readonly queryBus: QueryBus, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    postId: PostId,
    userId: UserId
  ) {
    const like = await this.repository.find(id)

    if (like) return

    const post = await this.findPostById(postId)
    const space = await this.findSpaceById(post.spaceId)

    if (!(space.configuration as PostsConfiguration['configuration']).allowsLikes) return

    const created = Like.create(id, postId, userId)

    await this.repository.persist(created)
    await this.eventBus.publish(created.pullDomainEvents())
  }

  private async findPostById (postId: PostId) {
    const query = new FindPostByIdQuery(postId.valueOf())

    return (await this.queryBus.ask<PostResponse>(query)).response
  }

  private async findSpaceById (id: string) {
    const spaceQuery = new FindSpaceByIdQuery(id)

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
