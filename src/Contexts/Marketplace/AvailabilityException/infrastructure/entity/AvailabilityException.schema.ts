import { AvailabilityExceptionId } from '../../domain/ValueObjects/AvailabilityExceptionId'
import { ProductId } from '../../domain/ValueObjects/ProductId'
import { ExceptionDate } from '../../domain/ValueObjects/ExceptionDate'
import { ExceptionType } from '../../domain/ValueObjects/ExceptionType'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { AvailabilityException } from '../../domain/AvailabilityException'

export const AvailabilityExceptionSchema = new EntitySchema<AvailabilityException>({
  name: 'AvailabilityException',
  target: AvailabilityException,
  tableName: 'availability_exception',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(AvailabilityExceptionId)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    date: {
      type: String,
      transformer: ValueObjectTransformer(ExceptionDate)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(ExceptionType)
    }
    // Add timeRanges as a JSON column if needed in the future
  },
  indices: [
    {
      name: 'IDX_availability_exception_productId',
      columns: ['productId']
    }
  ]
})
