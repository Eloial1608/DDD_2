import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Name } from './ValueObjects/Name'
import { CommunityId } from './ValueObjects/CommunityId'
import { TitleImageUrl } from './ValueObjects/TitleImageUrl'
import { Id } from './ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { TitleCreatedDomainEvent } from './Events/TitleCreatedDomainEvent'
import { TitleDeletedDomainEvent } from './Events/TitleDeletedDomainEvent'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { TitleUpdatedDomainEvent } from './Events/TitleUpdatedDomainEvent'

export class Title extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly name: Name,
        readonly communityId: CommunityId,
        readonly titleImageUrl: Nullable<TitleImageUrl>,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    communityId: CommunityId,
    titleImageUrl: Nullable<TitleImageUrl>
  ): Title {
    const title = new Title(
      id,
      name,
      communityId,
      titleImageUrl,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )
    title.record(TitleCreatedDomainEvent.fromAggregate(title))

    return title
  }

  update (
    name: Name,
    titleImageUrl: Nullable<TitleImageUrl>
  ): Title {
    const title = new Title(
      this.id,
      name,
      this.communityId,
      titleImageUrl,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    title.record(TitleUpdatedDomainEvent.fromAggregate(title))

    return title
  }

  delete (): Title {
    const title = new Title(
      this.id,
      this.name,
      this.communityId,
      this.titleImageUrl,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    title.record(TitleDeletedDomainEvent.fromAggregate(title))

    return title
  }
}
