import { ReviewRepository } from '@Marketplace/Reviews/domain/ReviewRepository'
import { Id } from '@Marketplace/Reviews/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (
        private readonly repository: ReviewRepository,
        private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id
  ) {
    const review = await this.repository.find(id)

    if (!review) return

    const deleted = review.delete()

    await this.repository.persist(deleted)

    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
