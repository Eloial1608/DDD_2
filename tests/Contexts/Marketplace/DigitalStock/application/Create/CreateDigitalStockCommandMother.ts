import type { AvailableDigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import { CreateDigitalStockCommand } from '@Marketplace/DigitalStock/application/Create/CreateDigitalStockCommand'
import type { DigitalStock } from '@Marketplace/DigitalStock/domain/DigitalStock'

// biome-ignore lint/complexity/noStaticOnlyClass: CommandMother pattern
export class CreateDigitalStockCommandMother {
  static create (
    id: string,
    communityId: string,
    productId: string,
    type: AvailableDigitalStockType,
    value: string,
    isAvailable: boolean
  ): CreateDigitalStockCommand {
    return new CreateDigitalStockCommand(
      id,
      communityId,
      productId,
      type,
      value,
      isAvailable
    )
  }

  static fromAggregate (stock: DigitalStock): CreateDigitalStockCommand {
    return CreateDigitalStockCommandMother.create(
      stock.id.valueOf(),
      stock.communityId.valueOf(),
      stock.productId.valueOf(),
      stock.type.valueOf(),
      stock.value.valueOf(),
      stock.isAvailable.valueOf()
    )
  }
}
