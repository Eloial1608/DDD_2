import { PostUser } from '@Posts/PostUser/domain/PostUser'
import { PostUserRepository } from '@Posts/PostUser/domain/PostUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { PostUserSchema } from './entity/PostUserSchema'
import { Id } from '@Posts/PostUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmPostUserRepository extends TypeOrmRepository<PostUser> implements PostUserRepository {
  protected get entitySchema (): EntitySchema {
    return PostUserSchema
  }

  async find (id: Id): Promise<Nullable<PostUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<PostUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (postUser: PostUser): Promise<void> {
    await (await this.repository()).save(postUser)
  }
}
