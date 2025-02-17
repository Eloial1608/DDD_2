import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CommunityNotFound extends DomainError {
  protected code = 'community-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A community with id ${id} wasn't found`
  }
}
