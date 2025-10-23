import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { CommunityAlreadyExistsById } from '@Core/Community/domain/Errors/CommunityAlreadyExistsById'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Community } from '@Core/Community/domain/Community'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'
import { CommunityAlreadyExistsBySlug } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySlug'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { About } from '@Core/Community/domain/ValueObjects/About'

type Params = {
    id: Id
    name: Name
    slug: Slug
    parentId: ParentId
    about: Nullable<About>
    logoUrl: Nullable<LogoUrl>
    bannerUrl: Nullable<BannerUrl>
}

export class Creator {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    await this.checkIfCommunityExists(params.id, params.slug, params.parentId)

    const parentCommunity = await this.repository.find(params.parentId)

    if (!parentCommunity) throw new CommunityNotFound(params.parentId)

    const community = Community.create(
      params.id,
      params.name,
      params.slug,
      params.parentId,
      parentCommunity.mainId ?? parentCommunity.id,
      params.logoUrl,
      params.bannerUrl,
      null,
      parentCommunity.color,
      parentCommunity.allowedFeatures,
      parentCommunity.allowedUsers,
      parentCommunity.expiresAt,
      parentCommunity.allowedSubcommunities,
      parentCommunity.allowsTitles,
      parentCommunity.allowsPayments,
      parentCommunity.firstPaymentDone,
      params.about
    )

    await this.repository.persist(community)

    await this.eventBus.publish(community.pullDomainEvents())
  }

  private async checkIfCommunityExists (id: Id, slug: Slug, parentId: ParentId) {
    const existingCommunity = await this.repository.find(id)

    if (existingCommunity) throw new CommunityAlreadyExistsById(id)

    const existingCommunityBySlug = await this.getCommunityBySlug(slug, parentId)

    if (existingCommunityBySlug) throw new CommunityAlreadyExistsBySlug(slug)
  }

  private async getCommunityBySlug (slug: Slug, parentId: ParentId): Promise<Nullable<Community>> {
    return (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('slug', '=', slug.valueOf()),
          Filter.simple('parentId', '=', parentId.valueOf())
        ])
      )
    )).pop()
  }
}
