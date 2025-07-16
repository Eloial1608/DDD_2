import { Action } from '@Marketplace/Action/domain/Action'
import type { ActionRepository } from '@Marketplace/Action/domain/ActionRepository'
import type { Id } from '@Marketplace/Action/domain/ValueObjects/Id'
import type { ProductId } from '@Marketplace/Action/domain/ValueObjects/ProductId'
import type { EventBus } from '@Shared/domain/EventBus/EventBus'
import type { Nullable } from '@Shared/domain/Nullable'
import type { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindProductByIdQuery } from '@Marketplace/Products/application/FindById/FindProductByIdQuery'
import type { CommunityId } from '@Marketplace/Action/domain/ValueObjects/CommunityId'
import type { ActionType } from '@Marketplace/Action/domain/ValueObjects/ActionType'
import type { TargetId } from '@Marketplace/Action/domain/ValueObjects/TargetId'
import type { ProductResponse } from '@Marketplace/Products/application/ProductResponse'

export class Creator {
  constructor (
        private readonly repository: ActionRepository,
        private readonly eventBus: EventBus,
        private readonly queryBus: QueryBus
  ) {}

  async run (
    id: Id,
    communityId: CommunityId,
    productId: ProductId,
    type: ActionType,
    targetId: Nullable<TargetId>
  ) {
    const action = await this.repository.find(id)

    if (action) return

    const product = await this.findProductById(productId)

    if (!product) return

    const created = Action.create(
      id,
      communityId,
      productId,
      type,
      targetId
    )

    await this.repository.persist(created)

    await this.eventBus.publish(created.pullDomainEvents())
  }

  private async findProductById (id: ProductId) {
    const query = new FindProductByIdQuery(id.valueOf())

    return (await this.queryBus.ask<ProductResponse>(query)).response
  }
}
