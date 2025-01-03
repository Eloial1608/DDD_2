import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class PlanForUsersAlreadyExists extends DomainError {
  protected code = 'plan-for-users-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A plan for users with id ${id} already exists`
  }
}
