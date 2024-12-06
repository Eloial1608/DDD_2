import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { HomeSpaceId } from '@Core/Community/domain/ValueObjects/HomeSpaceId'
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

type Params = {
    id: Id
    name: Name
    suffix: Suffix
    color: Color
    allowedFeatures: AllowedFeatures
    allowedUsers: AllowedUsers
    homeSpaceId: HomeSpaceId
    expiresAt: ExpiresAt
}

export class Creator {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const existingCommunity = await this.repository.find(params.id)

    if (existingCommunity) throw new CommunityAlreadyExistsById(params.id)

    const existingCommunityBySuffix = await this.getCommunityBySuffix(params.suffix)

    if (existingCommunityBySuffix) throw new CommunityAlreadyExistsBySuffix(params.suffix)

    const community = Community.create(
      params.id,
      params.name,
      params.suffix,
      params.color,
      params.allowedFeatures,
      params.allowedUsers,
      params.homeSpaceId,
      params.expiresAt
    )

    await this.repository.persist(community)

    await this.eventBus.publish(community.pullDomainEvents())
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
}
