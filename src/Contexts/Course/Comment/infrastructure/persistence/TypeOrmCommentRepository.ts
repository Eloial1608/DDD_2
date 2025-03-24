import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Id } from '@Course/Comment/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { CommentRepository } from '@Course/Comment/domain/CommentRepository'
import { Comment } from '@Course/Comment/domain/Comment'
import { CommentSchema } from './entity/CommentSchema'

export class TypeOrmCommentRepository extends TypeOrmRepository<Comment> implements CommentRepository {
  protected get entitySchema (): EntitySchema {
    return CommentSchema
  }

  async find (id: Id): Promise<Nullable<Comment>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Comment[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (comment: Comment): Promise<void> {
    await (await this.repository()).save(comment)
  }

  async delete (comment: Comment): Promise<void> {
    await (await this.repository()).remove(comment)
  }
}
