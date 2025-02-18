import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { CommunityId } from './ValueObjects/CommunityId'
import { SpaceId } from './ValueObjects/SpaceId'
import { UserId } from './ValueObjects/UserId'
import { Author } from './ValueObjects/Author'
import { Title } from './ValueObjects/Title'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { IsPaid } from './ValueObjects/IsPaid'
import { Price } from './ValueObjects/Price'
import { TotalStudents } from './ValueObjects/TotalStudents'
import { TotalComments } from './ValueObjects/TotalComments'
import { StartDate } from './ValueObjects/StartDate'
import { EndDate } from './ValueObjects/EndDate'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { CourseCreatedDomainEvent } from './Events/CourseCreatedDomainEvent'
import { MaxStudents } from './ValueObjects/MaxStudents'
import { CourseUpdatedDomainEvent } from './Events/CourseUpdatedDomainEvent'

export class Course extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly communityId: CommunityId,
    readonly spaceId: SpaceId,
    readonly userId: UserId,
    readonly author: Author,
    readonly title: Title,
    readonly bannerUrl: Nullable<BannerUrl>,
    readonly isPaid: IsPaid,
    readonly price: Nullable<Price>,
    readonly startDate: StartDate,
    readonly endDate: Nullable<EndDate>,
    readonly maxStudents: Nullable<MaxStudents>,
    readonly totalStudents: TotalStudents,
    readonly totalComments: TotalComments,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    spaceId: SpaceId,
    userId: UserId,
    author: Author,
    title: Title,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>,
    startDate: StartDate,
    endDate: Nullable<EndDate>,
    maxStudents: Nullable<MaxStudents>
  ): Course {
    const course = new Course(
      id,
      communityId,
      spaceId,
      userId,
      author,
      title,
      bannerUrl,
      isPaid,
      price,
      startDate,
      endDate,
      maxStudents,
      new TotalStudents(0),
      new TotalComments(0),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    course.record(CourseCreatedDomainEvent.fromAggregate(course))

    return course
  }

  update (
    id: Id,
    title: Title,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>,
    startDate: StartDate,
    endDate: Nullable<EndDate>,
    maxStudents: Nullable<MaxStudents>
  ): Course {
    const course = new Course(
      id,
      this.communityId,
      this.spaceId,
      this.userId,
      this.author,
      title,
      bannerUrl,
      isPaid,
      price,
      startDate,
      endDate,
      maxStudents,
      this.totalStudents,
      this.totalComments,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    course.record(CourseUpdatedDomainEvent.fromAggregate(course))

    return course
  }
}
