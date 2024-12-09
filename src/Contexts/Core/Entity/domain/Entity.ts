import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { Nullable } from '@Shared/domain/Nullable'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Price } from './ValueObjects/Price'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Accessibility } from '@playwright/test'
import { Type } from 'typescript'
import { CreatedBy } from './ValueObjects/CreatedBy'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { HeaderUrl } from './ValueObjects/HeaderUrl'
import { Icon } from './ValueObjects/Icon'
import { ParentId } from './ValueObjects/ParentId'
import { Slug } from './ValueObjects/Slug'
import { TotalMembers } from './ValueObjects/TotalMembers'

export class Entity extends AggregateRoot {
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
        readonly deletedAt: Nullable<DeletedAt>,
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    slug: Slug,
    totalMembers: TotalMembers,
    createdBy: CreatedBy,
    accessibility: Accessibility,
    type: Type,
    price: Price,
  ): Entity {
    const entity = new Entity(
      id,
      name,
      slug,
      null,
      totalMembers,
      null,
      createdBy,
      accessibility,
      null,
      type,
      price,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null,
    )

    return entity
  }
}
