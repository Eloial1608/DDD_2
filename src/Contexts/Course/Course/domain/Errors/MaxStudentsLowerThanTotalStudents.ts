import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class MaxStudentsLowerThanTotalStudents extends DomainError {
  protected code = 'max-students-lower-than-total-students'
  protected message

  constructor (id: Id) {
    super()
    this.message = `Max students lower than total students in course with id ${id}`
  }
}
