import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { CourseId } from './ValueObjects/CourseId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'

export class CourseUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly courseId: CourseId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
}
