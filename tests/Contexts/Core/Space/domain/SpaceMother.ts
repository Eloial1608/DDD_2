import { Space } from '@Core/Space/domain/Space'
import { Accessibility, AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { CreatedAt } from '@Core/Space/domain/ValueObjects/CreatedAt'
import { CreatedBy } from '@Core/Space/domain/ValueObjects/CreatedBy'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { Name } from '@Core/Space/domain/ValueObjects/Name'
import { Slug } from '@Core/Space/domain/ValueObjects/Slug'
import { TotalMembers } from '@Core/Space/domain/ValueObjects/TotalMembers'
import { AllowedTypes, Type } from '@Core/Space/domain/ValueObjects/Type'
import { UpdatedAt } from '@Core/Space/domain/ValueObjects/UpdatedAt'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class SpaceMother {
  static create (params: Partial<Space>): Space {
    return new Space(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.slug ?? new Slug(SlugMother.random()),
      params.parentId ?? null,
      params.totalMembers ?? new TotalMembers(0),
      params.icon ?? null,
      params.createdBy ?? new CreatedBy(UuidMother.random()),
      params.accessibility ?? new Accessibility(AllowedAccessibilities.PUBLIC),
      params.headerUrl ?? null,
      params.type ?? new Type(AllowedTypes.POST),
      params.price ?? null,
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Space {
    return this.create({})
  }
}
