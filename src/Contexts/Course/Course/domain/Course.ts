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
    readonly totalStudents: TotalStudents,
    readonly totalComments: TotalComments,
    readonly startDate: StartDate,
    readonly endDate: Nullable<EndDate>,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }
}
