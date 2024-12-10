import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Price } from '@Core/Space/domain/ValueObjects/Price'
import { SpaceRepository } from '@Core/Space/domain/SpaceRepository'
import { Accessibility, AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { CreatedBy } from '@Core/Space/domain/ValueObjects/CreatedBy'
import { HeaderUrl } from '@Core/Space/domain/ValueObjects/HeaderUrl'
import { Icon } from '@Core/Space/domain/ValueObjects/Icon'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { ParentId } from '@Core/Space/domain/ValueObjects/ParentId'
import { Slug } from '@Core/Space/domain/ValueObjects/Slug'
import { Type } from '@Core/Space/domain/ValueObjects/Type'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceAlreadyExistsById } from '@Core/Space/domain/Errors/SpaceAlreadyExistsById'
import { Space } from '@Core/Space/domain/Space'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { SpaceAlreadyExistsBySlug } from '@Core/Space/domain/Errors/SpaceAlreadyExistsBySlug'
import { InvalidAccessibilityPrice } from '@Core/Space/domain/Errors/InvalidAccessibilityPrice'

export class Creator {
  constructor (private readonly repository: SpaceRepository, private readonly eventBus: EventBus) {}

  async run (
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
  ) {
    await this.checkIfExists(id, slug)

    if (accessibility.valueOf() === AllowedAccessibilities.PAYMENT && !price) throw new InvalidAccessibilityPrice(accessibility)

    const space = Space.create(
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

    await this.repository.persist(space)
    await this.eventBus.publish(space.pullDomainEvents())
  }

  private async getSpaceBySlug (slug: Slug): Promise<Nullable<Space>> {
    return (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('slug', '=', slug.valueOf())
        ])
      )
    )).pop()
  }

  private async checkIfExists (id: Id, slug: Slug) {
    const existingById = await this.repository.find(id)

    if (existingById) throw new SpaceAlreadyExistsById(id)

    const existingBySlug = await this.getSpaceBySlug(slug)

    if (existingBySlug) throw new SpaceAlreadyExistsBySlug(slug)
  }
}
