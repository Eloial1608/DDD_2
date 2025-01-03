import { CommentRepository } from '@Posts/Comment/domain/CommentRepository'
import { Comment } from '@Posts/Comment/domain/Comment'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: CommentRepository) {}

  async find (criteria: Criteria): Promise<Array<Comment>> {
    return await this.repository.search(criteria)
  }
}
