import { DeleteDigitalStockCommand } from '@Marketplace/DigitalStock/application/Delete/DeleteDigitalStockCommand'
import type { DigitalStock } from '@Marketplace/DigitalStock/domain/DigitalStock'

export class DeleteDigitalStockCommandMother {
  static create (id: string): DeleteDigitalStockCommand {
    return new DeleteDigitalStockCommand(id)
  }

  static fromAggregate (stock: DigitalStock): DeleteDigitalStockCommand {
    return DeleteDigitalStockCommandMother.create(stock.id.valueOf())
  }
}
