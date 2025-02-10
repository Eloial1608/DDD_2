import { UpdateCourseCommand } from '@Course/Course/application/Update/UpdateCourseCommand'
import { Course } from '@Course/Course/domain/Course'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateCourseCommandMother {
  static update (
    id: string,
    communityId: string,
    spaceId: string,
    userId: string,
    title: string,
    bannerUrl: Nullable<string>,
    isPaid: boolean,
    price: Nullable<{
      value: number,
      currency: string
    }>,
    startDate: Date,
    endDate: Nullable<Date>,
    maxStudents: Nullable<number>
  ): UpdateCourseCommand {
    return new UpdateCourseCommand(
      id,
      communityId,
      spaceId,
      userId,
      title,
      bannerUrl,
      isPaid,
      price,
      startDate,
      endDate,
      maxStudents
    )
  }

  static fromAggregate (course: Course): UpdateCourseCommand {
    return this.update(
      course.id.valueOf(),
      course.communityId.valueOf(),
      course.spaceId.valueOf(),
      course.userId.valueOf(),
      course.title.valueOf(),
      course.bannerUrl?.valueOf(),
      course.isPaid.valueOf(),
      course.price
        ? {
            value: course.price.value.valueOf(),
            currency: course.price.currency.valueOf()
          }
        : null,
      course.startDate.valueOf(),
      course.endDate?.valueOf(),
      course.maxStudents.valueOf()
    )
  }
}
