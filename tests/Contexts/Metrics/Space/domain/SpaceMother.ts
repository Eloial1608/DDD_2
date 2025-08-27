import { Space } from '@Metrics/Space/domain/Space'
import { CommunityId } from '@Metrics/Space/domain/ValueObjects/CommunityId'
import { Id } from '@Metrics/Space/domain/ValueObjects/Id'
import { Type } from '@Metrics/Space/domain/ValueObjects/Type'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'


export class SpaceMother {
  static create (params: Partial<Space>): Space {
    return new Space(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.type ?? new Type(AllowedTypes.POST)
  }

  static random (): Space {
    return this.create({})
  }
}
