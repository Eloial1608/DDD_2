import { CommentRepository } from '@Posts/Comment/domain/CommentRepository'
import { Author } from '@Posts/Comment/domain/ValueObjects/Author'
import { Content } from '@Posts/Comment/domain/ValueObjects/Content'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { PostId } from '@Posts/Comment/domain/ValueObjects/PostId'
import { UserId } from '@Posts/Comment/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Comment } from '@Posts/Comment/domain/Comment'
import { FindPostByIdQuery } from '@Posts/Post/application/FindById/FindPostByIdQuery'
import { PostResponse } from '@Posts/Post/application/PostResponse'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'
import { PostsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/PostsConfiguration'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'

export class Creator {
  constructor (private readonly repository: CommentRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    postId: PostId,
    userId: UserId,
    content: Content
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserById(userId)

    if (!user) return

    const post = await this.findPostById(postId)
    const space = await this.findSpaceById(post.spaceId)

    if (!(space.configuration as PostsConfiguration['configuration']).allowsComments) return

    const comment = Comment.create(
      id,
      postId,
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

  private async findPostById (postId: PostId) {
    const query = new FindPostByIdQuery(postId.valueOf())

    return (await this.queryBus.ask<PostResponse>(query)).response
  }

  private async findSpaceById (id: string) {
    const spaceQuery = new FindSpaceByIdQuery(id)

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
