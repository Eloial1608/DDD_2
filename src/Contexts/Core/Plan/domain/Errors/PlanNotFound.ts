import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class PlanNotFound extends DomainError {
  protected code = 'plan-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A plan with id ${id} wasn't found`
  }
}
