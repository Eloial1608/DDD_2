import { CreateCourseCommand } from '@Course/Course/application/Create/CreateCourseCommand'
import { Course } from '@Course/Course/domain/Course'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCourseCommandMother {
  static create (
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
    maxStudents: number
  ): CreateCourseCommand {
    return new CreateCourseCommand(
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

  static fromAggregate (course: Course): CreateCourseCommand {
    return this.create(
      course.id.valueOf(),
      course.communityId.valueOf(),
      course.spaceId.valueOf(),
      course.userId.valueOf(),
      course.title.valueOf(),
      course.bannerUrl ? course.bannerUrl.valueOf() : null,
      course.isPaid.valueOf(),
      course.price
        ? {
            value: course.price.value.valueOf(),
            currency: course.price.currency.valueOf()
          }
        : null,
      course.startDate.valueOf(),
      course.endDate ? course.endDate.valueOf() : null,
      course.maxStudents.valueOf(),
    )
  }
}
