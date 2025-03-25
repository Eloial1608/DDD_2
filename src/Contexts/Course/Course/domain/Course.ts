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
import { CourseDeletedDomainEvent } from './Events/CourseDeletedDomainEvent'
import { CourseUpdatedDomainEvent } from './Events/CourseUpdatedDomainEvent'
import { CourseTotalStudentsUpdatedDomainEvent } from './Events/CourseTotalStudentsUpdatedDomainEvent'
import { CourseTotalCommentsUpdatedDomainEvent } from './Events/CourseTotalCommentsUpdatedDomainEvent'

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

  delete (): Course {
    const course = new Course(
      this.id,
      this.communityId,
      this.spaceId,
      this.userId,
      this.author,
      this.title,
      this.bannerUrl,
      this.isPaid,
      this.price,
      this.startDate,
      this.endDate,
      this.maxStudents,
      this.totalStudents,
      this.totalComments,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    course.record(CourseDeletedDomainEvent.fromAggregate(course))

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

  updateTotalStudents (
    totalStudents: TotalStudents
  ): Course {
    const course = new Course(
      this.id,
      this.communityId,
      this.spaceId,
      this.userId,
      this.author,
      this.title,
      this.bannerUrl,
      this.isPaid,
      this.price,
      this.startDate,
      this.endDate,
      this.maxStudents,
      totalStudents,
      this.totalComments,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    course.record(CourseTotalStudentsUpdatedDomainEvent.fromAggregate(course))

    return course
  }

  updateTotalComments (
    totalComments: TotalComments
  ): Course {
    const course = new Course(
      this.id,
      this.communityId,
      this.spaceId,
      this.userId,
      this.author,
      this.title,
      this.bannerUrl,
      this.isPaid,
      this.price,
      this.startDate,
      this.endDate,
      this.maxStudents,
      this.totalStudents,
      totalComments,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    course.record(CourseTotalCommentsUpdatedDomainEvent.fromAggregate(course))

    return course
  }
}
