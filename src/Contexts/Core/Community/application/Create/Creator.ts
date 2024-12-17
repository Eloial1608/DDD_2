import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { ExpiresAt } from '@Core/Community/domain/ValueObjects/ExpiresAt'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { CommunityAlreadyExistsById } from '@Core/Community/domain/Errors/CommunityAlreadyExistsById'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { CommunityAlreadyExistsBySuffix } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySuffix'
import { Community } from '@Core/Community/domain/Community'
import { AllowedFeatures } from '@Core/Community/domain/ValueObjects/AllowedFeatures'
import { AllowedUsers } from '@Core/Community/domain/ValueObjects/AllowedUsers'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { MainId } from '@Core/Community/domain/ValueObjects/MainId'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'
import { CommunityAlreadyExistsBySlug } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySlug'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'

type Params = {
    id: Id
    name: Name
    suffix: Suffix
    slug: Slug,
    parentId: Nullable<ParentId>,
    logoUrl: Nullable<LogoUrl>,
    bannerUrl: Nullable<BannerUrl>,
    color: Color
    allowedFeatures: AllowedFeatures
    allowedUsers: AllowedUsers
    expiresAt: ExpiresAt
}

export class Creator {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    await this.checkIfCommunityExists(params.id, params.suffix, params.slug)

    let mainId: Nullable<MainId> = null

    if (params.parentId) {
      const parentCommunity = await this.repository.find(params.parentId)

      if (!parentCommunity) throw new CommunityNotFound(params.parentId)

      mainId = parentCommunity.mainId ?? parentCommunity.id
    }

    const community = Community.create(
      params.id,
      params.name,
      params.slug,
      params.parentId,
      mainId,
      params.logoUrl,
      params.bannerUrl,
      params.suffix,
      params.color,
      params.allowedFeatures,
      params.allowedUsers,
      params.expiresAt
    )

    await this.repository.persist(community)

    await this.eventBus.publish(community.pullDomainEvents())
  }

  private async checkIfCommunityExists (id: Id, suffix: Suffix, slug: Slug) {
    const existingCommunity = await this.repository.find(id)

    if (existingCommunity) throw new CommunityAlreadyExistsById(id)

    const existingCommunityBySuffix = await this.getCommunityBySuffix(suffix)

    if (existingCommunityBySuffix) throw new CommunityAlreadyExistsBySuffix(suffix)

    const existingCommunityBySlug = await this.getCommunityBySlug(slug)

    if (existingCommunityBySlug) throw new CommunityAlreadyExistsBySlug(slug)
  }

  private async getCommunityBySuffix (suffix: Suffix): Promise<Nullable<Community>> {
    return (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('suffix', '=', suffix.valueOf())
        ])
      )
    )).pop()
  }

  private async getCommunityBySlug (slug: Slug): Promise<Nullable<Community>> {
    return (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('slug', '=', slug.valueOf())
        ])
      )
    )).pop()
  }
}
