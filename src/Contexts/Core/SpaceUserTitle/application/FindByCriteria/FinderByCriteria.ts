import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: SpaceUserTitleRepository) {}

  async find (criteria: Criteria): Promise<Array<SpaceUserTitle>> {
    return await this.repository.search(criteria)
  }
}
