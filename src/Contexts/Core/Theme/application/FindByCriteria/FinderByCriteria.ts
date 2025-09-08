import { ThemeRepository } from '@Core/Theme/domain/ThemeRepository'
import { Theme } from '@Core/Theme/domain/Theme'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ThemeRepository) {}

  async find (criteria: Criteria): Promise<Array<Theme>> {
    return await this.repository.search(criteria)
  }
}
