import { PlanForUsersRepository } from '@Core/PlanForUsers/domain/PlanForUsersRepository'
import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: PlanForUsersRepository) {}

  async find (criteria: Criteria): Promise<Array<PlanForUsers>> {
    return await this.repository.search(criteria)
  }
}
