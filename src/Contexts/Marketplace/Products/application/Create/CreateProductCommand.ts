import { ProductMediaPrimitive } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'
import { ProductTypes } from '@Marketplace/Products/domain/ValueObjects/Type'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateProductCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly spaceId: string,
        readonly title: string,
        readonly userId: string,
        readonly content: string,
        readonly bannerUrl: Nullable<string>,
        readonly productMedia: ProductMediaPrimitive[],
        readonly type: ProductTypes,
        readonly stock: Nullable<number>,
        readonly price: {
            value: number,
            currency: string
        }
  ) {}
}
