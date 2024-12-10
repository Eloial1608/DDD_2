import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class SpaceAlreadyExistsById extends DomainError {
  protected code = 'space-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A space with id ${id} already exists`
  }
}
