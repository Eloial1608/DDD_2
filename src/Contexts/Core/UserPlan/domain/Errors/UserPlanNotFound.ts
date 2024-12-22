import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class UserPlanNotFound extends DomainError {
  protected code = 'user-plan-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A user plan with id ${id} wasn't found`
  }
}
