import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class TitleAlreadyExistsById extends DomainError {
  protected code = 'title-already-exists-by-id'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A title with id ${id} already exists`
  }
}
