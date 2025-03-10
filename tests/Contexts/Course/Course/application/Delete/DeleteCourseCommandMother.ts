import { DeleteCourseCommand } from '@Course/Course/application/Delete/DeleteCourseCommand'
import { Course } from '@Course/Course/domain/Course'

export class DeleteCourseCommandMother {
  static delete (id: string, communityId: string, userId: string): DeleteCourseCommand {
    return new DeleteCourseCommand(id, communityId, userId)
  }

  static fromAggregate (course: Course): DeleteCourseCommand {
    return this.delete(
      course.id.valueOf(),
      course.communityId.valueOf(),
      course.userId.valueOf()
    )
  }
}
