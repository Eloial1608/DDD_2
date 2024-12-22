import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class PlanForUsersNotFound extends DomainError {
  protected code = 'plan-for-users-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A plan for users with id ${id} wasn't found`
  }
}
