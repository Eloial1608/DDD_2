import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { Section } from '@Course/Section/domain/Section'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: SectionRepository) {}

  async find (criteria: Criteria): Promise<Array<Section>> {
    return await this.repository.search(criteria)
  }
}
