import { AvailabilityRuleId } from '../../domain/ValueObjects/AvailabilityRuleId'
import { ProductId } from '../../domain/ValueObjects/ProductId'
import { Weekday } from '../../domain/ValueObjects/Weekday'
import { Time } from '../../domain/ValueObjects/Time'
import { SlotDurationMinutes } from '../../domain/ValueObjects/SlotDurationMinutes'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { AvailabilityRule } from '../../domain/AvailabilityRule'

export const AvailabilityRuleSchema = new EntitySchema<AvailabilityRule>({
  name: 'AvailabilityRule',
  target: AvailabilityRule,
  tableName: 'availability_rule',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(AvailabilityRuleId)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    weekday: {
      type: Number,
      transformer: ValueObjectTransformer(Weekday)
    },
    startTime: {
      type: String,
      transformer: ValueObjectTransformer(Time)
    },
    endTime: {
      type: String,
      transformer: ValueObjectTransformer(Time)
    },
    slotDurationMinutes: {
      type: Number,
      transformer: ValueObjectTransformer(SlotDurationMinutes)
    }
  },
  indices: [
    {
      name: 'IDX_availability_rule_productId',
      columns: ['productId']
    }
  ]
})
