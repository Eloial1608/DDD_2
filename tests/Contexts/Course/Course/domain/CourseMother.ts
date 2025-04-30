import { Course } from '@Course/Course/domain/Course'
import { Author } from '@Course/Course/domain/ValueObjects/Author'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Course/Course/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { IsPaid } from '@Course/Course/domain/ValueObjects/IsPaid'
import { SpaceId } from '@Course/Course/domain/ValueObjects/SpaceId'
import { StartDate } from '@Course/Course/domain/ValueObjects/StartDate'
import { Title } from '@Course/Course/domain/ValueObjects/Title'
import { TotalComments } from '@Course/Course/domain/ValueObjects/TotalComments'
import { TotalStudents } from '@Course/Course/domain/ValueObjects/TotalStudents'
import { UpdatedAt } from '@Course/Course/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { User } from '@Course/User/domain/User'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class CourseMother {
  static create (params: Partial<Course>): Course {
    return new Course(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.spaceId ?? new SpaceId(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.author ?? new Author(
        UuidMother.random(),
        UuidMother.random(),
        WordMother.random(),
        SlugMother.random(),
        null,
        null
      ),
      params.title ?? new Title(WordMother.random()),
      params.description ?? null,
      params.bannerUrl ?? null,
      params.isPaid ?? new IsPaid(false),
      params.price ?? null,
      params.startDate ?? new StartDate(new Date()),
      params.endDate ?? null,
      params.maxStudents ?? null,
      params.totalStudents ?? new TotalStudents(0),
      params.totalComments ?? new TotalComments(0),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Course {
    return this.create({})
  }

  static forAuthor (user: User): Course {
    return this.create({
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })
  }
}
