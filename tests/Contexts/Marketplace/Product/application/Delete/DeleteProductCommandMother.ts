import { DeleteProductCommand } from '@Marketplace/Products/application/Delete/DeleteProductCommand'
import { Product } from '@Marketplace/Products/domain/Product'

export class DeleteProductCommandMother {
  static create (
    id: string
  ): DeleteProductCommand {
    return new DeleteProductCommand(
      id
    )
  }

  static fromAggregate (product: Product): DeleteProductCommand {
    return this.create(
      product.id.valueOf()
    )
  }
}
