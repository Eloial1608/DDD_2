import { PlanForUsersRepository } from '@Core/PlanForUsers/domain/PlanForUsersRepository'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { PlanForUsersNotFound } from '@Core/PlanForUsers/domain/errors/PlanForUsersNotFound'

export class FinderById {
  constructor (private readonly repository: PlanForUsersRepository) {}

  async find (id: Id): Promise<PlanForUsers> {
    const planForUsers = await this.repository.find(id)

    if (!planForUsers) throw new PlanForUsersNotFound(id)

    return planForUsers
  }
}
