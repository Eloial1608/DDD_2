import { SpaceRepository } from '@Core/Space/domain/SpaceRepository'
import { Space } from '@Core/Space/domain/Space'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: SpaceRepository) {}

  async find (criteria: Criteria): Promise<Array<Space>> {
    return await this.repository.search(criteria)
  }
}
