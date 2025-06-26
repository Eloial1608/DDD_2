import { ProductMediaPrimitive } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateProductCommand implements Command {
  constructor (
        readonly id: string,
        readonly title: string,
        readonly content: string,
        readonly bannerUrl: Nullable<string>,
        readonly productMedia: ProductMediaPrimitive[],
        readonly stock: Nullable<number>,
        readonly price: {
            value: number,
            currency: string
        }
  ) {}
}
