import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CourseId } from './ValueObjects/CourseId'
import { Title } from './ValueObjects/Title'
import { TotalLessons } from './ValueObjects/TotalLessons'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'

export class Section extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly courseId: CourseId,
        readonly title: Title,
        readonly totalLessons: TotalLessons,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }
}
