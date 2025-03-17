import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class LessonNotFound extends DomainError {
  protected code = 'lesson-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A lesson with id ${id} wasn't found`
  }
}
