import { Community } from '@Core/Community/domain/Community'
import { AllowedFeatures } from '@Core/Community/domain/ValueObjects/AllowedFeatures'
import { AllowedSubcommunities } from '@Core/Community/domain/ValueObjects/AllowedSubcommunities'
import { AllowedUsers } from '@Core/Community/domain/ValueObjects/AllowedUsers'
import { AllowsPayments } from '@Core/Community/domain/ValueObjects/AllowsPayments'
import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { CreatedAt } from '@Core/Community/domain/ValueObjects/CreatedAt'
import { ExpiresAt } from '@Core/Community/domain/ValueObjects/ExpiresAt'
import { FirstPaymentDone } from '@Core/Community/domain/ValueObjects/FirstPaymentDone'
import { HasPayment } from '@Core/Community/domain/ValueObjects/HasPayment'
import { HasRegisterForm } from '@Core/Community/domain/ValueObjects/HasRegisterForm'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Core/Community/domain/ValueObjects/IsPrivate'
import { IsRegisterOpen } from '@Core/Community/domain/ValueObjects/IsRegisterOpen'
import { MembersCount } from '@Core/Community/domain/ValueObjects/MembersCount'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { SpaceOrderedIds } from '@Core/Community/domain/ValueObjects/SpaceOrderedIds'
import { SpacesCount } from '@Core/Community/domain/ValueObjects/SpacesCount'
import { SubcommunitiesCount } from '@Core/Community/domain/ValueObjects/SubcommunitiesCount'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { UpdatedAt } from '@Core/Community/domain/ValueObjects/UpdatedAt'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { SlugMother } from '@Tests/Contexts/Shared/domain/SlugMother'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class CommunityMother {
  static create (params: Partial<Community>): Community {
    return new Community(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.suffix ?? new Suffix(WordMother.random()),
      params.domain ?? null,
      params.slug ?? new Slug(SlugMother.random()),
      params.parentId ?? null,
      params.mainId ?? null,
      params.logoUrl ?? null,
      params.bannerUrl ?? null,
      params.about ?? null,
      params.membersCount ?? new MembersCount(0),
      params.allowsPayments ?? new AllowsPayments(false),
      params.firstPaymentDone ?? new FirstPaymentDone(false),
      params.spacesCount ?? new SpacesCount(0),
      params.hasPayment ?? new HasPayment(false),
      params.methodId ?? null,
      params.allowedFeatures ?? new AllowedFeatures([]),
      params.hasRegisterForm ?? new HasRegisterForm(false),
      params.registerFormId ?? null,
      params.allowedUsers ?? new AllowedUsers(1),
      params.color ?? new Color(MotherCreator.random().internet.color()),
      params.isPrivate ?? new IsPrivate(false),
      params.isRegisterOpen ?? new IsRegisterOpen(true),
      params.homeSpaceId ?? null,
      params.allowedSubcommunities ?? new AllowedSubcommunities(10),
      params.subcommunitiesCount ?? new SubcommunitiesCount(0),
      params.spaceOrderedIds ?? new SpaceOrderedIds('[]'),
      params.expiresAt ?? new ExpiresAt(MotherCreator.random().date.future()),
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date()),
      params.deletedAt ?? null
    )
  }

  static random (): Community {
    return this.create({})
  }
}
