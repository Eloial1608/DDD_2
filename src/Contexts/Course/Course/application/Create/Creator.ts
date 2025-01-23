import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { SpaceId } from '@Course/Course/domain/ValueObjects/SpaceId'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { Title } from '@Course/Course/domain/ValueObjects/Title'
import { BannerUrl } from '@Course/Course/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Course/Course/domain/ValueObjects/IsPaid'
import { Price } from '@Course/Course/domain/ValueObjects/Price'
import { TotalStudents } from '@Course/Course/domain/ValueObjects/TotalStudents'
import { TotalComments } from '@Course/Course/domain/ValueObjects/TotalComments'
import { StartDate } from '@Course/Course/domain/ValueObjects/StartDate'
import { EndDate } from '@Course/Course/domain/ValueObjects/EndDate'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Creator {
  constructor (private readonly repository: CourseRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    spaceId: SpaceId,
    userId: UserId,
    title: Title,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>,
    totalStudents: TotalStudents,
    totalComments: TotalComments,
    startDate: StartDate,
    endDate: Nullable<EndDate>
  ) {
    if ((isPaid.valueOf() && !price) || (price && !isPaid.valueOf())) return

    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) return

    const space = await this.findSpaceById(spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) return

    if (!(space.configuration as CoursesConfiguration['configuration']).allowsPaid && isPaid.valueOf()) return
    if ((space.configuration as CoursesConfiguration['configuration']).mustHaveBanner && !bannerUrl?.valueOf()) return

    const post = Course.create(
      id,
      communityId,
      userId,
      spaceId,
      title,
      content,
      bannerUrl,
      new Author(
        user.id,
        user.mainId,
        user.name,
        user.username,
        user.pictureUrl,
        user.bannerUrl
      ),
      isPaid,
      price
    )

    await this.repository.persist(post)
    await this.eventBus.publish(post.pullDomainEvents())
  }

  private async findUserByIdAndCommunityId (id: UserId, communityId: CommunityId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }

  private async findSpaceById (id: SpaceId) {
    const spaceQuery = new FindSpaceByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }
}
