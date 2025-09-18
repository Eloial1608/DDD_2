import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { CommunityConfiguration } from '@Core/CommunityConfiguration/domain/CommunityConfiguration'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: CommunityConfigurationRepository) {}

  async find (criteria: Criteria): Promise<Array<CommunityConfiguration>> {
    return await this.repository.search(criteria)
  }
}
