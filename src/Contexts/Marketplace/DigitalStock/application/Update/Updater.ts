import type { DigitalStockRepository } from '@Marketplace/DigitalStock/domain/DigitalStockRepository'
import type { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'
import type { DigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import type { Value } from '@Marketplace/DigitalStock/domain/ValueObjects/Value'
import type { IsAvailable } from '@Marketplace/DigitalStock/domain/ValueObjects/IsAvailable'
import type { EventBus } from '@Shared/domain/EventBus/EventBus'
import { DigitalStockNotFound } from '@Marketplace/DigitalStock/domain/Errors/DigitalStockNotFound'

export class Updater {
  constructor (
    private readonly repository: DigitalStockRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id,
    type: DigitalStockType,
    value: Value,
    isAvailable: IsAvailable
  ) {
    const stock = await this.repository.find(id)
    if (!stock) throw new DigitalStockNotFound(id)

    const updated = stock.update(
      type,
      value,
      isAvailable
    )

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
