import { EventUser } from '@Events/EventUser/domain/EventUser'
import { EventUserRepository } from '@Events/EventUser/domain/EventUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { EventUserSchema } from './entity/EventUserSchema'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmEventUserRepository extends TypeOrmRepository<EventUser> implements EventUserRepository {
  protected get entitySchema (): EntitySchema {
    return EventUserSchema
  }

  async find (id: Id): Promise<Nullable<EventUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<EventUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (eventUser: EventUser): Promise<void> {
    await (await this.repository()).save(eventUser)
  }
}
