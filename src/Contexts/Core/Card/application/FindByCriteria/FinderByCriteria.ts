import { CardRepository } from '@Core/Card/domain/CardRepository'
import { Card } from '@Core/Card/domain/Card'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: CardRepository) {}

  async find (criteria: Criteria): Promise<Array<Card>> {
    return await this.repository.search(criteria)
  }
}
