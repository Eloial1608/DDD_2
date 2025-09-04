import { Session } from '@Metrics/Session/domain/Session'
import { SessionRepository } from '@Metrics/Session/domain/SessionRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { SessionSchema } from './entity/SessionSchema'
import { Id } from '@Metrics/Session/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmSessionRepository extends TypeOrmRepository<Session> implements SessionRepository {
  protected get entitySchema (): EntitySchema {
    return SessionSchema
  }

  async find (id: Id): Promise<Nullable<Session>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Session[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (session: Session): Promise<void> {
    await (await this.repository()).save(session)
  }
}
