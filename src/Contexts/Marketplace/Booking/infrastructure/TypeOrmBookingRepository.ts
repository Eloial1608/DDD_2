import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import type { Booking } from '../domain/Booking'
import { BookingSchema } from './entity/Booking.schema'
import type { BookingRepository } from '../domain/BookingRepository'
import type { BookingId } from '../domain/ValueObjects/BookingId'
import type { Nullable } from '@Shared/domain/Nullable'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { EntitySchema } from 'typeorm'
import { Equal } from 'typeorm'

export class TypeOrmBookingRepository extends TypeOrmRepository<Booking> implements BookingRepository {
  protected get entitySchema (): EntitySchema {
    return BookingSchema
  }

  async find (id: BookingId): Promise<Nullable<Booking>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Booking[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (booking: Booking): Promise<void> {
    await (await this.repository()).save(booking)
  }

  async delete (booking: Booking): Promise<void> {
    await (await this.repository()).remove(booking)
  }
}
