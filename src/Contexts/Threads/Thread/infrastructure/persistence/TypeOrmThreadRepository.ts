import { Thread } from '@Threads/Thread/domain/Thread'
import { ThreadRepository } from '@Threads/Thread/domain/ThreadRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { ThreadSchema } from './entity/ThreadSchema'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmThreadRepository extends TypeOrmRepository<Thread> implements ThreadRepository {
  protected get entitySchema (): EntitySchema {
    return ThreadSchema
  }

  async find (id: Id): Promise<Nullable<Thread>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Thread[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (thread: Thread): Promise<void> {
    await (await this.repository()).save(thread)
  }
}
