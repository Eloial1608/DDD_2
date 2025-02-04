import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class FormNotFound extends DomainError {
  protected code = 'form-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A form with id ${id} wasn't found`
  }
}
