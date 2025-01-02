import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class PostNotFound extends DomainError {
  protected code = 'post-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A post with id ${id} wasn't found`
  }
}
