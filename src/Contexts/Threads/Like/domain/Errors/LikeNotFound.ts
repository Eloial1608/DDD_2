import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class LikeNotFound extends DomainError {
  protected code = 'like-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A like with id ${id} wasn't found`
  }
}
