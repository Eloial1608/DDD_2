import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class SpaceUserTitleAlreadyExistsById extends DomainError {
  protected code = 'space-user-title-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A spaceUserTitle with id ${id} already exists`
  }
}
