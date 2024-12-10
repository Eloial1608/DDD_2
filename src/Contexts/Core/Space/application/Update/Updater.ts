import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Price } from '@Core/Space/domain/ValueObjects/Price'
import { SpaceRepository } from '@Core/Space/domain/SpaceRepository'
import { Accessibility, AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { HeaderUrl } from '@Core/Space/domain/ValueObjects/HeaderUrl'
import { Icon } from '@Core/Space/domain/ValueObjects/Icon'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { ParentId } from '@Core/Space/domain/ValueObjects/ParentId'
import { Slug } from '@Core/Space/domain/ValueObjects/Slug'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { InvalidAccessibilityPrice } from '@Core/Space/domain/Errors/InvalidAccessibilityPrice'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'

export class Updater {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    name: Name,
    slug: Slug,
    parentId: Nullable<ParentId>,
    icon: Nullable<Icon>,
    headerUrl: Nullable<HeaderUrl>,
    accessibility: Accessibility,
    price: Nullable<Price>,
    communityId: CommunityId
  ) {
    const space = await this.repository.find(id)

    if (!space || space.communityId.valueOf() !== communityId.valueOf()) throw new SpaceNotFound(id)

    if (accessibility.valueOf() === AllowedAccessibilities.PAYMENT && !price) throw new InvalidAccessibilityPrice(accessibility)

    const updatedSpace = space.update(
      id,
      name,
      slug,
      parentId,
      icon,
      headerUrl,
      accessibility,
      price
    )

    await this.repository.persist(updatedSpace)
    await this.eventBus.publish(updatedSpace.pullDomainEvents())
  }
}
