import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class FormAlreadyExists extends DomainError {
  protected code = 'form-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A form with id ${id} already exists`
  }
}
