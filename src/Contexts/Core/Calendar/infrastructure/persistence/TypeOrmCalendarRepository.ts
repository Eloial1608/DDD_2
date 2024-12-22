import { Calendar } from '@Core/Calendar/domain/Calendar'
import { CalendarRepository } from '@Core/Calendar/domain/CalendarRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { CalendarSchema } from './entity/CalendarSchema'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmCalendarRepository extends TypeOrmRepository<Calendar> implements CalendarRepository {
  protected get entitySchema (): EntitySchema {
    return CalendarSchema
  }

  async find (id: Id): Promise<Nullable<Calendar>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Calendar[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (calendar: Calendar): Promise<void> {
    await (await this.repository()).save(calendar)
  }

  async delete (calendar: Calendar): Promise<void> {
    await (await this.repository()).remove(calendar)
  }
}
