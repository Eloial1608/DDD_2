import { EventsUser } from '@Events/EventsUser/domain/EventsUser'
import { EventsUserRepository } from '@Events/EventsUser/domain/EventsUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { EventsUserSchema } from './entity/EventsUserSchema'
import { Id } from '@Events/EventsUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmEventsUserRepository extends TypeOrmRepository<EventsUser> implements EventsUserRepository {
  protected get entitySchema (): EntitySchema {
    return EventsUserSchema
  }

  async find (id: Id): Promise<Nullable<EventsUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<EventsUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (eventsUser: EventsUser): Promise<void> {
    await (await this.repository()).save(eventsUser)
  }
}
