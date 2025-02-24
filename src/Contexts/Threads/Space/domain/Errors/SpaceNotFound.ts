import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class SpaceNotFound extends DomainError {
  protected code = 'space-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A space with id ${id} wasn't found`
  }
}
