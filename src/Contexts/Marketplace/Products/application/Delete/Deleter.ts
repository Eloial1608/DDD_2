import { ProductRepository } from '@Marketplace/Products/domain/ProductRepository'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (
        private readonly repository: ProductRepository,
        private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id
  ) {
    const product = await this.repository.find(id)

    if (!product) return

    const deleted = product.delete()

    await this.repository.persist(deleted)

    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
