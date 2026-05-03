import { UserRepository } from '@Core/User/domain/UserRepository'
import { User } from '@Core/User/domain/User'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: UserRepository) {}

  async find (criteria: Criteria): Promise<Array<User>> {
    return await this.repository.search(criteria)
  }
}
