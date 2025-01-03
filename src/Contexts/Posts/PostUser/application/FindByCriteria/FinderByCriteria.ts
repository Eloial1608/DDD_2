import { PostUserRepository } from '@Posts/PostUser/domain/PostUserRepository'
import { PostUser } from '@Posts/PostUser/domain/PostUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: PostUserRepository) {}

  async find (criteria: Criteria): Promise<Array<PostUser>> {
    return await this.repository.search(criteria)
  }
}
