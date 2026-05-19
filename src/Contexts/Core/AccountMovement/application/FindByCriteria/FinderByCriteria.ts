
import { AccountMovement } from '@Core/AccountMovement/domain/AccountMovement'
import { AccountMovementRepository } from '@Core/AccountMovement/domain/AccountMovementRepository'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: AccountMovementRepository) {}

  async find (criteria: Criteria): Promise<Array<AccountMovement>> {
    return await this.repository.search(criteria)
  }
}
