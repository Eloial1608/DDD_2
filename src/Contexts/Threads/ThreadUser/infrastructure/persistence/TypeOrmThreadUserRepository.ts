import { ThreadUser } from '@Threads/ThreadUser/domain/ThreadUser'
import { ThreadUserRepository } from '@Threads/ThreadUser/domain/ThreadUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { ThreadUserSchema } from './entity/ThreadUserSchema'
import { Id } from '@Threads/ThreadUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmThreadUserRepository extends TypeOrmRepository<ThreadUser> implements ThreadUserRepository {
  protected get entitySchema (): EntitySchema {
    return ThreadUserSchema
  }

  async find (id: Id): Promise<Nullable<ThreadUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<ThreadUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (threadUser: ThreadUser): Promise<void> {
    await (await this.repository()).save(threadUser)
  }
}
