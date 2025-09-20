import { UserLevelRepository } from '@Core/UserLevel/domain/UserLevelRepository'
import { UserLevel } from '@Core/UserLevel/domain/UserLevel'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: UserLevelRepository) {}

  async find (criteria: Criteria): Promise<Array<UserLevel>> {
    return await this.repository.search(criteria)
  }
}
