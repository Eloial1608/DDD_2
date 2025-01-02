import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { Post } from '@Posts/Post/domain/Post'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: PostRepository) {}

  async find (criteria: Criteria): Promise<Array<Post>> {
    return await this.repository.search(criteria)
  }
}
