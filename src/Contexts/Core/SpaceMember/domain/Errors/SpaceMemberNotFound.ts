import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class SpaceMemberNotFound extends DomainError {
  protected code = 'space-member-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A space member with id ${id} wasn't found`
  }
}
