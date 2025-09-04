import { TitleRepository } from '@Core/Title/domain/TitleRepository'
import { Title } from '@Core/Title/domain/Title'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: TitleRepository) {}

  async find (criteria: Criteria): Promise<Array<Title>> {
    return await this.repository.search(criteria)
  }
}
