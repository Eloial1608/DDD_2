import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class StatusNotFound extends DomainError {
  protected code = 'status-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A status with id ${id} wasn't found`
  }
}
