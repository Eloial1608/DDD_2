import { UserTitleRepository } from '@Core/UserTitle/domain/UserTitleRepository'
import { UserTitle } from '@Core/UserTitle/domain/UserTitle'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: UserTitleRepository) {}

  async find (criteria: Criteria): Promise<Array<UserTitle>> {
    return await this.repository.search(criteria)
  }
}
