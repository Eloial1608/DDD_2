import { UpdateSpaceCommand } from '@Core/Space/application/Update/UpdateSpaceCommand'
import { Space } from '@Core/Space/domain/Space'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateSpaceCommandMother {
  static update (
    id: string,
    name: string,
    slug: string,
    parentId: Nullable<string>,
    icon: Nullable<string>,
    headerUrl: Nullable<string>,
    accessibility: string,
    price: Nullable<{
        value: number,
        currency: string
    }>,
    communityId: string
  ): UpdateSpaceCommand {
    return new UpdateSpaceCommand(
      id,
      name,
      slug,
      parentId,
      icon,
      headerUrl,
      accessibility,
      price,
      communityId
    )
  }

  static fromAggregate (space: Space): UpdateSpaceCommand {
    return this.update(
      space.id.valueOf(),
      space.name.valueOf(),
      space.slug.valueOf(),
      space.parentId?.valueOf(),
      space.icon?.valueOf(),
      space.headerUrl?.valueOf(),
      space.accessibility.valueOf(),
      space.price
        ? {
            value: space.price.value.valueOf(),
            currency: space.price.currency.valueOf()
          }
        : null,
      space.communityId.valueOf()
    )
  }
}
