import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { CommunityAlreadyExistsBySuffix } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySuffix'
import { Community } from '@Core/Community/domain/Community'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'
import { CommunityAlreadyExistsBySlug } from '@Core/Community/domain/Errors/CommunityAlreadyExistsBySlug'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { Domain } from '@Core/Community/domain/ValueObjects/Domain'
import { About } from '@Core/Community/domain/ValueObjects/About'
import { IsPrivate } from '@Core/Community/domain/ValueObjects/IsPrivate'
import { IsRegisterOpen } from '@Core/Community/domain/ValueObjects/IsRegisterOpen'
import { CommunityAlreadyExistsByDomain } from '@Core/Community/domain/Errors/CommunityAlreadyExistsByDomain'

type Params = {
    id: Id
    name: Name
    suffix: Nullable<Suffix>
    slug: Slug,
    domain: Nullable<Domain>,
    about: Nullable<About>,
    isPrivate: IsPrivate,
    isRegisterOpen: IsRegisterOpen,
    logoUrl: Nullable<LogoUrl>,
    bannerUrl: Nullable<BannerUrl>,
    color: Color
}

export class Updater {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const community = await this.repository.find(params.id)

    if (!community) throw new CommunityNotFound(params.id)

    await this.checkIfCommunityExists(params.id, params.suffix, params.slug, params.domain)

    const modified = community.update(
      params.id,
      params.name,
      params.slug,
      params.domain,
      params.about,
      params.isPrivate,
      params.isRegisterOpen,
      params.logoUrl,
      params.bannerUrl,
      params.suffix,
      params.color
    )

    await this.repository.persist(modified)

    await this.eventBus.publish(modified.pullDomainEvents())
  }

  private async checkIfCommunityExists (id: Id, suffix: Nullable<Suffix>, slug: Slug, domain: Nullable<Domain>) {
    if (domain) {
      const existingCommunityByDomain = await this.getCommunityByDomain(domain)

      if (existingCommunityByDomain && existingCommunityByDomain.id.valueOf() !== id.valueOf()) throw new CommunityAlreadyExistsByDomain(domain)
    }

    if (suffix) {
      const existingCommunityBySuffix = await this.getCommunityBySuffix(suffix)

      if (existingCommunityBySuffix && existingCommunityBySuffix.id.valueOf() !== id.valueOf()) throw new CommunityAlreadyExistsBySuffix(suffix)
    }

    const existingCommunityBySlug = await this.getCommunityBySlug(slug)

    if (existingCommunityBySlug && existingCommunityBySlug.id.valueOf() !== id.valueOf()) throw new CommunityAlreadyExistsBySlug(slug)
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

  private async getCommunityByDomain (domain: Domain): Promise<Nullable<Community>> {
    return (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('domain', '=', domain.valueOf())
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
