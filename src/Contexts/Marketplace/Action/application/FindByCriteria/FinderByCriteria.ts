import type { ActionRepository } from '@Marketplace/Action/domain/ActionRepository'
import type { Action } from '@Marketplace/Action/domain/Action'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: ActionRepository) {}

  async find (criteria: Criteria): Promise<Array<Action>> {
    return await this.repository.search(criteria)
  }
}
