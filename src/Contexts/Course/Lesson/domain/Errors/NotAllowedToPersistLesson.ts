import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class NotAllowedToPersistLesson extends DomainError {
  protected code = 'not-allowed-to-persist-lesson'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Can't persist the lesson with id ${id}`
  }
}
