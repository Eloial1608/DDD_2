import { CommentRepository } from '@Posts/Comment/domain/CommentRepository'
import { Author } from '@Posts/Comment/domain/ValueObjects/Author'
import { Content } from '@Posts/Comment/domain/ValueObjects/Content'
import { CreatedAt } from '@Posts/Comment/domain/ValueObjects/CreatedAt'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { PostId } from '@Posts/Comment/domain/ValueObjects/PostId'
import { UpdatedAt } from '@Posts/Comment/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Posts/Comment/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { Comment } from '@Posts/Comment/domain/Comment'
import { CommentCollectionResponse } from '../CommentCollectionResponse'

export class Creator {
  constructor (private readonly repository: CommentRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    postId: PostId,
    userId: UserId,
    author: Author,
    content: Content,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserById(userId)

    if (!user) return

    const comment = Comment.create(
      id,
      postId,
      userId,
      new Author(
        author.id,
        author.mainId,
        author.name,
        author.username,
        author.pictureUrl,
        author.bannerUrl
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

    return (await this.queryBus.ask<CommentCollectionResponse>(userQuery)).response.pop()
  }
}
