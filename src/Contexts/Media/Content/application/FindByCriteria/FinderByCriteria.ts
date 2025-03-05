import { ContentRepository } from '@Media/Content/domain/ContentRepository'
import { Content } from '@Media/Content/domain/Content'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ContentRepository) {}

  async find (criteria: Criteria): Promise<Array<Content>> {
    return await this.repository.search(criteria)
  }
}
