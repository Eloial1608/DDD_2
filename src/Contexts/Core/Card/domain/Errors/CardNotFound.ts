import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CardNotFound extends DomainError {
  protected code = 'Card-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A Card with id ${id} wasn't found`
  }
}
