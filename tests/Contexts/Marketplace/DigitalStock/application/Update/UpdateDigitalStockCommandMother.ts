import type { AvailableDigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import { UpdateDigitalStockCommand } from '@Marketplace/DigitalStock/application/Update/UpdateDigitalStockCommand'
import type { DigitalStock } from '@Marketplace/DigitalStock/domain/DigitalStock'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class UpdateDigitalStockCommandMother {
  static create (
    id: string,
    type: AvailableDigitalStockType,
    value: string,
    isAvailable: boolean
  ): UpdateDigitalStockCommand {
    return new UpdateDigitalStockCommand(
      id,
      type,
      value,
      isAvailable
    )
  }

  static fromAggregate (stock: DigitalStock): UpdateDigitalStockCommand {
    return UpdateDigitalStockCommandMother.create(
      stock.id.valueOf(),
      stock.type.valueOf(),
      stock.value.valueOf(),
      stock.isAvailable.valueOf()
    )
  }
}
