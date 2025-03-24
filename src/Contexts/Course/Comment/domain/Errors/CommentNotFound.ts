import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CommentNotFound extends DomainError {
  protected code = 'comment-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A comment with id ${id} wasn't found`
  }
}
