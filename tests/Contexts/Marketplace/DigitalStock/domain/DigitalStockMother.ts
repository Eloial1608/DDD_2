import { AvailableDigitalStockType, DigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import { DigitalStock } from '@Marketplace/DigitalStock/domain/DigitalStock'
import { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'
import { ProductId } from '@Marketplace/DigitalStock/domain/ValueObjects/ProductId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { CommunityId } from '@Marketplace/DigitalStock/domain/ValueObjects/CommunityId'
import { Value } from '@Marketplace/DigitalStock/domain/ValueObjects/Value'
import { IsAvailable } from '@Marketplace/DigitalStock/domain/ValueObjects/IsAvailable'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DigitalStockMother {
  static create (params: Partial<DigitalStock>): DigitalStock {
    return new DigitalStock(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.productId ?? new ProductId(UuidMother.random()),
      params.type ?? new DigitalStockType(AvailableDigitalStockType.CODE),
      params.value ?? new Value('test-value'),
      params.isAvailable ?? new IsAvailable(true),
      params.purchasedAt ?? null
    )
  }

  static random (): DigitalStock {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    return this.create({})
  }
}
