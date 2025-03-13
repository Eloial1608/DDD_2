import { CourseUser } from '@Course/CourseUser/domain/CourseUser'
import { CourseId } from '@Course/CourseUser/domain/ValueObjects/CourseId'
import { CreatedAt } from '@Course/CourseUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/CourseUser/domain/ValueObjects/Id'
import { UserId } from '@Course/CourseUser/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class CourseUserMother {
  static create (params: Partial<CourseUser>): CourseUser {
    return new CourseUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.courseId ?? new CourseId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): CourseUser {
    return this.create({})
  }
}
