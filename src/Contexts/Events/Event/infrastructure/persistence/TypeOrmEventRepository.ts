import { Event } from '@Events/Event/domain/Event'
import { EventRepository } from '@Events/Event/domain/EventRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { EventSchema } from './entity/EventSchema'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmEventRepository extends TypeOrmRepository<Event> implements EventRepository {
  protected get entitySchema (): EntitySchema {
    return EventSchema
  }

  async find (id: Id): Promise<Nullable<Event>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Event[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (event: Event): Promise<void> {
    await (await this.repository()).save(event)
  }
}
