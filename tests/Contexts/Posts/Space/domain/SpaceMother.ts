import { Space } from '@Posts/Space/domain/Space'
import { Accessibility } from '@Posts/Space/domain/ValueObjects/Accessibility'
import { CommunityId } from '@Posts/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Posts/Space/domain/ValueObjects/Configuration'
import { Id } from '@Posts/Space/domain/ValueObjects/Id'
import { Type } from '@Posts/Space/domain/ValueObjects/Type'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { ConfigurationFactory } from '@Shared/domain/SharedValueObjects/Space/Configuration/ConfigurationFactory'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class SpaceMother {
  static create (params: Partial<Space>): Space {
    return new Space(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.accessibility ?? new Accessibility(AllowedAccessibilities.PUBLIC),
      params.configuration ?? ConfigurationFactory.create(AllowedTypes.POST, {}) as Configuration,
      params.type ?? new Type(AllowedTypes.POST)
    )
  }

  static random (): Space {
    return this.create({})
  }
}
