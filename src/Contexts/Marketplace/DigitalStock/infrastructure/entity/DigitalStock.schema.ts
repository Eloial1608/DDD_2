import { Id } from '../../domain/ValueObjects/Id'
import { CommunityId } from '../../domain/ValueObjects/CommunityId'
import { ProductId } from '../../domain/ValueObjects/ProductId'
import { DigitalStockType } from '../../domain/ValueObjects/DigitalStockType'
import { Value } from '../../domain/ValueObjects/Value'
import { IsAvailable } from '../../domain/ValueObjects/IsAvailable'
import { PurchasedAt } from '../../domain/ValueObjects/PurchasedAt'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { DigitalStock } from '../../domain/DigitalStock'

export const DigitalStockSchema = new EntitySchema<DigitalStock>({
  name: 'DigitalStock',
  target: DigitalStock,
  tableName: 'digital_stock',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(DigitalStockType)
    },
    value: {
      type: String,
      transformer: ValueObjectTransformer(Value)
    },
    isAvailable: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsAvailable)
    },
    purchasedAt: {
      type: Date,
      nullable: true,
      transformer: ValueObjectTransformer(PurchasedAt)
    }
  }
})
