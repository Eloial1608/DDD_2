import { Space } from '@Events/Space/domain/Space'
import { Accessibility } from '@Events/Space/domain/ValueObjects/Accessibility'
import { CommunityId } from '@Events/Space/domain/ValueObjects/CommunityId'
import { Id } from '@Events/Space/domain/ValueObjects/Id'
import { Type } from '@Events/Space/domain/ValueObjects/Type'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { ConfigurationFactory } from '@Shared/domain/SharedValueObjects/Space/Configuration/ConfigurationFactory'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { Configuration } from '@Events/Space/domain/ValueObjects/Configuration'

export class SpaceMother {
  static create (params: Partial<Space>): Space {
    return new Space(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.accessibility ?? new Accessibility(AllowedAccessibilities.PUBLIC),
      (params.configuration ?? ConfigurationFactory.create(AllowedTypes.EVENTS, {})) as Configuration,
      params.type ?? new Type(AllowedTypes.EVENTS)
    )
  }

  static random (): Space {
    return this.create({})
  }
}
