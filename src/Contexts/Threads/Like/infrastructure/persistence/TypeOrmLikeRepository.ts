import { Like } from '@Threads/Like/domain/Like'
import { LikeRepository } from '@Threads/Like/domain/LikeRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { LikeSchema } from './entity/LikeSchema'
import { Id } from '@Threads/Like/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmLikeRepository extends TypeOrmRepository<Like> implements LikeRepository {
  protected get entitySchema (): EntitySchema {
    return LikeSchema
  }

  async find (id: Id): Promise<Nullable<Like>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Like[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (like: Like): Promise<void> {
    await (await this.repository()).save(like)
  }

  async delete (like: Like): Promise<void> {
    await (await this.repository()).remove(like)
  }
}
