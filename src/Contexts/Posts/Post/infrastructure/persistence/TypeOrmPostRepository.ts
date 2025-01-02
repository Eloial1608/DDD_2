import { Post } from '@Posts/Post/domain/Post'
import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { PostSchema } from './entity/PostSchema'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmPostRepository extends TypeOrmRepository<Post> implements PostRepository {
  protected get entitySchema (): EntitySchema {
    return PostSchema
  }

  async find (id: Id): Promise<Nullable<Post>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Post[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (post: Post): Promise<void> {
    await (await this.repository()).save(post)
  }
}
