import type { DigitalStockRepository } from '@Marketplace/DigitalStock/domain/DigitalStockRepository'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { DigitalStock } from '@Marketplace/DigitalStock/domain/DigitalStock'

export class FinderByCriteria {
  constructor (private readonly repository: DigitalStockRepository) {}

  async run (criteria: Criteria): Promise<DigitalStock[]> {
    return this.repository.search(criteria)
  }
}
