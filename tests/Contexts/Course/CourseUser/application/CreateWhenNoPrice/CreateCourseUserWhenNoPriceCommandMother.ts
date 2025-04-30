import { CreateCourseUserWhenNoPriceCommand } from '@Course/CourseUser/application/CreateWhenNoPrice/CreateCourseUserWhenNoPriceCommand'
import { CourseUser } from '@Course/CourseUser/domain/CourseUser'

export class CreateCourseUserWhenNoPriceCommandMother {
  static create (
    id: string,
    userId: string,
    courseId: string
  ): CreateCourseUserWhenNoPriceCommand {
    return new CreateCourseUserWhenNoPriceCommand(
      id,
      userId,
      courseId
    )
  }

  static fromAggregate (course: CourseUser): CreateCourseUserWhenNoPriceCommand {
    return this.create(
      course.id.valueOf(),
      course.userId.valueOf(),
      course.courseId.valueOf()
    )
  }
}
