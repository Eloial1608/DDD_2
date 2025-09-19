import { LevelRepository } from '@Core/Level/domain/LevelRepository'
import { Level } from '@Core/Level/domain/Level'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: LevelRepository) {}

  async find (criteria: Criteria): Promise<Array<Level>> {
    return await this.repository.search(criteria)
  }
}
