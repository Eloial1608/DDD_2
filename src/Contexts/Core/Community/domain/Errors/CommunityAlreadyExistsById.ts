import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CommunityAlreadyExistsById extends DomainError {
  protected code = 'community-already-exists'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A community with id ${id} already exists`
  }
}
