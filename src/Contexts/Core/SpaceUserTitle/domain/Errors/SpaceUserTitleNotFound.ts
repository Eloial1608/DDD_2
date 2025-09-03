import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class SpaceUserTitleNotFound extends DomainError {
  protected code = 'space-user-title-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A spaceUserTitle with id ${id} wasn't found`
  }
}
