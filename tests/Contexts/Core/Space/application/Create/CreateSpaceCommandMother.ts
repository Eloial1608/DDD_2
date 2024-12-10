import { CreateSpaceCommand } from '@Core/Space/application/Create/CreateSpaceCommand'
import { Space } from '@Core/Space/domain/Space'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateSpaceCommandMother {
  static create (
    id: string,
    name: string,
    slug: string,
    parentId: Nullable<string>,
    icon: Nullable<string>,
    headerUrl: Nullable<string>,
    type: string,
    createdBy: string,
    accessibility: string,
    price: Nullable<{
        value: number,
        currency: string
    }>
  ): CreateSpaceCommand {
    return new CreateSpaceCommand(
      id,
      name,
      slug,
      parentId,
      icon,
      headerUrl,
      type,
      createdBy,
      accessibility,
      price
    )
  }

  static fromAggregate (space: Space): CreateSpaceCommand {
    return this.create(
      space.id.valueOf(),
      space.name.valueOf(),
      space.slug.valueOf(),
      space.parentId?.valueOf(),
      space.icon?.valueOf(),
      space.headerUrl?.valueOf(),
      space.type.valueOf(),
      space.createdBy.valueOf(),
      space.accessibility.valueOf(),
      space.price
        ? {
            value: space.price.value.valueOf(),
            currency: space.price.currency.valueOf()
          }
        : null
    )
  }
}
