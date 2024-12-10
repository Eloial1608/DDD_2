import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { Nullable } from '@Shared/domain/Nullable'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Price } from './ValueObjects/Price'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { CreatedBy } from './ValueObjects/CreatedBy'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { HeaderUrl } from './ValueObjects/HeaderUrl'
import { Icon } from './ValueObjects/Icon'
import { ParentId } from './ValueObjects/ParentId'
import { Slug } from './ValueObjects/Slug'
import { TotalMembers } from './ValueObjects/TotalMembers'
import { Accessibility } from './ValueObjects/Accessibility'
import { Type } from './ValueObjects/Type'
import { SpaceCreatedDomainEvent } from './Events/SpaceCreatedDomainEvent'

export class Space extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly name: Name,
        readonly slug: Slug,
        readonly parentId: Nullable<ParentId>,
        readonly totalMembers: TotalMembers,
        readonly icon: Nullable<Icon>,
        readonly createdBy: CreatedBy,
        readonly accessibility: Accessibility,
        readonly headerUrl: Nullable<HeaderUrl>,
        readonly type: Type,
        readonly price: Nullable<Price>,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    slug: Slug,
    parentId: Nullable<ParentId>,
    icon: Nullable<Icon>,
    headerUrl: Nullable<HeaderUrl>,
    type: Type,
    createdBy: CreatedBy,
    accessibility: Accessibility,
    price: Nullable<Price>
  ): Space {
    const space = new Space(
      id,
      name,
      slug,
      parentId,
      new TotalMembers(0),
      icon,
      createdBy,
      accessibility,
      headerUrl,
      type,
      price,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    space.record(SpaceCreatedDomainEvent.fromAggregate(space))

    return space
  }
}
