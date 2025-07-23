import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { Booking } from './Booking'
import type { BookingId } from './ValueObjects/BookingId'
import type { Nullable } from '@Shared/domain/Nullable'

export interface BookingRepository {
  find(id: BookingId): Promise<Nullable<Booking>>
  persist(booking: Booking): Promise<void>
  search(criteria: Criteria): Promise<Booking[]>
  delete(booking: Booking): Promise<void>
}
