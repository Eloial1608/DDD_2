import { Space } from '@Course/Space/domain/Space'
import { Accessibility } from '@Course/Space/domain/ValueObjects/Accessibility'
import { CommunityId } from '@Course/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Course/Space/domain/ValueObjects/Configuration'
import { Id } from '@Course/Space/domain/ValueObjects/Id'
import { Type } from '@Course/Space/domain/ValueObjects/Type'
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
      params.configuration ?? ConfigurationFactory.create(AllowedTypes.COURSES, {}) as Configuration,
      params.type ?? new Type(AllowedTypes.COURSES)
    )
  }

  static random (): Space {
    return this.create({})
  }
}
