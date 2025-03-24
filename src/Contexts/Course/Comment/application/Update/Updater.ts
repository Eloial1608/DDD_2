import { CommentRepository } from '@Course/Comment/domain/CommentRepository'
import { CommentNotFound } from '@Course/Comment/domain/Errors/CommentNotFound'
import { Content } from '@Course/Comment/domain/ValueObjects/Content'
import { Id } from '@Course/Comment/domain/ValueObjects/Id'
import { UserId } from '@Course/Comment/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Updater {
  constructor (private readonly repository: CommentRepository, private readonly queryBus: QueryBus, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    content: Content
  ) {
    const comment = await this.repository.find(id)

    if (!comment) throw new CommentNotFound(id)

    const user = await this.findUserById(userId)

    if (!user || user.id !== comment.userId.valueOf()) return

    const updated = comment.update(content)

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
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
}
