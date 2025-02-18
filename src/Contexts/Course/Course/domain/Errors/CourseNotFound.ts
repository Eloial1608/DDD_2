import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class CourseNotFound extends DomainError {
  protected code = 'course-not-found'
  protected message

  constructor (id: Id) {
    super()
    this.message = `A course with id ${id} wasn't found`
  }
}
