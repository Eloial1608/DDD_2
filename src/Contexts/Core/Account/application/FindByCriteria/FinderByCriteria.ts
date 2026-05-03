import { AccountRepository } from '@Core/Account/domain/AccountRepository'
import { Account } from '@Core/Account/domain/Account'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: AccountRepository) {}

  async find (criteria: Criteria): Promise<Array<Account>> {
    return await this.repository.search(criteria)
  }
}
