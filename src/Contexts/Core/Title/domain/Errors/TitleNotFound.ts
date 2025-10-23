import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class TitleNotFound extends DomainError {
  protected code = 'title-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A title with id ${id} wasn't found`
  }
}
