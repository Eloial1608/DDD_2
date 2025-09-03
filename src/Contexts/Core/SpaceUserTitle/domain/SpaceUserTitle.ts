import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CommunityId } from './ValueObjects/CommunityId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Id } from './ValueObjects/Id'
import { SpaceId } from './ValueObjects/SpaceId'
import { TitleId } from './ValueObjects/TitleId'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { UserId } from './ValueObjects/UserId'
import { SpaceUserTitleCreatedDomainEvent } from './Events/SpaceUserTitleCreatedDomainEvent'
import { SpaceUserTitleUpdatedDomainEvent } from './Events/SpaceUserTitleUpdatedDomainEvent'
import { SpaceUserTitleDeletedDomainEvent } from './Events/SpaceUserTitleDeletedDomainEvent'

export class SpaceUserTitle extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly titleId: TitleId,
        readonly userId: UserId,
        readonly spaceId: SpaceId,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    titleId: TitleId,
    userId: UserId,
    spaceId: SpaceId
  ): SpaceUserTitle {
    const spaceUserTitle = new SpaceUserTitle(
      id,
      communityId,
      titleId,
      userId,
      spaceId,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    spaceUserTitle.record(SpaceUserTitleCreatedDomainEvent.fromAggregate(spaceUserTitle))

    return spaceUserTitle
  }

  update (
    id: Id,
    titleId: TitleId
  ): SpaceUserTitle {
    const spaceUserTitle = new SpaceUserTitle(
      id,
      this.communityId,
      titleId,
      this.userId,
      this.spaceId,
      this.createdAt,
      new UpdatedAt(new Date())
    )

    spaceUserTitle.record(SpaceUserTitleUpdatedDomainEvent.fromAggregate(spaceUserTitle))

    return spaceUserTitle
  }

  delete (): SpaceUserTitle {
    const spaceUserTitle = new SpaceUserTitle(
      this.id,
      this.communityId,
      this.titleId,
      this.userId,
      this.spaceId,
      this.createdAt,
      this.updatedAt
    )

    spaceUserTitle.record(SpaceUserTitleDeletedDomainEvent.fromAggregate(spaceUserTitle))

    return spaceUserTitle
  }
}
