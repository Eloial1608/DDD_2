import { DigitalStock } from '@Marketplace/DigitalStock/domain/DigitalStock'
import type { DigitalStockRepository } from '@Marketplace/DigitalStock/domain/DigitalStockRepository'
import type { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'
import type { CommunityId } from '@Marketplace/DigitalStock/domain/ValueObjects/CommunityId'
import type { ProductId } from '@Marketplace/DigitalStock/domain/ValueObjects/ProductId'
import type { DigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import type { Value } from '@Marketplace/DigitalStock/domain/ValueObjects/Value'
import type { IsAvailable } from '@Marketplace/DigitalStock/domain/ValueObjects/IsAvailable'
import type { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (
    private readonly repository: DigitalStockRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id,
    communityId: CommunityId,
    productId: ProductId,
    type: DigitalStockType,
    value: Value,
    isAvailable: IsAvailable
  ) {
    const stock = await this.repository.find(id)
    if (stock) return

    const created = DigitalStock.create(
      id,
      communityId,
      productId,
      type,
      value,
      isAvailable
    )

    await this.repository.persist(created)
    await this.eventBus.publish(created.pullDomainEvents())
  }
}
