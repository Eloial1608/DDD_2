import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { Community } from '@Core/Community/domain/Community'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: CommunityRepository) {}

  async find (criteria: Criteria): Promise<Array<Community>> {
    return await this.repository.search(criteria)
  }
}
