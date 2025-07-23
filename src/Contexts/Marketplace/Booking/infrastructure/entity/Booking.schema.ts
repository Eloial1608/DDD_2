import { BookingId } from '../../domain/ValueObjects/BookingId'
import { ProductId } from '../../domain/ValueObjects/ProductId'
import { UserId } from '../../domain/ValueObjects/UserId'
import { BookingDate } from '../../domain/ValueObjects/BookingDate'
import { Time } from '../../domain/ValueObjects/Time'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Booking } from '../../domain/Booking'

export const BookingSchema = new EntitySchema<Booking>({
  name: 'Booking',
  target: Booking,
  tableName: 'booking',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(BookingId)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    date: {
      type: String,
      transformer: ValueObjectTransformer(BookingDate)
    },
    startTime: {
      type: String,
      transformer: ValueObjectTransformer(Time)
    },
    endTime: {
      type: String,
      transformer: ValueObjectTransformer(Time)
    }
  },
  indices: [
    {
      name: 'IDX_booking_productId',
      columns: ['productId']
    },
    {
      name: 'IDX_booking_userId',
      columns: ['userId']
    }
  ]
})
