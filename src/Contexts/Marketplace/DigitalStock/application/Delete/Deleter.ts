import type { DigitalStockRepository } from '@Marketplace/DigitalStock/domain/DigitalStockRepository'
import type { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'
import type { EventBus } from '@Shared/domain/EventBus/EventBus'
import { DigitalStockAlreadyPurchased } from '@Marketplace/DigitalStock/domain/Errors/DigitalStockAlreadyPurchased'

export class Deleter {
  constructor (
    private readonly repository: DigitalStockRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (id: Id) {
    const stock = await this.repository.find(id)
    if (!stock) return

    if (stock.purchasedAt) throw new DigitalStockAlreadyPurchased(stock.id)

    const deleted = stock.delete()
    await this.repository.delete(deleted)
    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
