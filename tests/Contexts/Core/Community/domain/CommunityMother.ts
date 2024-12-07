import { Community } from '@Core/Community/domain/Community'
import { AllowedFeatures } from '@Core/Community/domain/ValueObjects/AllowedFeatures'
import { AllowedUsers } from '@Core/Community/domain/ValueObjects/AllowedUsers'
import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { CreatedAt } from '@Core/Community/domain/ValueObjects/CreatedAt'
import { ExpiresAt } from '@Core/Community/domain/ValueObjects/ExpiresAt'
import { FirstPaymentDone } from '@Core/Community/domain/ValueObjects/FirstPaymentDone'
import { HasPayment } from '@Core/Community/domain/ValueObjects/HasPayment'
import { HasRegisterForm } from '@Core/Community/domain/ValueObjects/HasRegisterForm'
import { HomeSpaceId } from '@Core/Community/domain/ValueObjects/HomeSpaceId'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Core/Community/domain/ValueObjects/IsPrivate'
import { IsRegisterOpen } from '@Core/Community/domain/ValueObjects/IsRegisterOpen'
import { MembersCount } from '@Core/Community/domain/ValueObjects/MembersCount'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { SpacesCount } from '@Core/Community/domain/ValueObjects/SpacesCount'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { UpdatedAt } from '@Core/Community/domain/ValueObjects/UpdatedAt'
import { MotherCreator } from '@Tests/Contexts/Shared/domain/MotherCreator'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { WordMother } from '@Tests/Contexts/Shared/domain/WordMother'

export class CommunityMother {
  static create (params: Partial<Community>): Community {
    return new Community(
      params.id ?? new Id(UuidMother.random()),
      params.name ?? new Name(WordMother.random()),
      params.suffix ?? new Suffix(WordMother.random()),
      params.domain ?? null,
      params.membersCount ?? new MembersCount(0),
      params.firstPaymentDone ?? new FirstPaymentDone(false),
      params.spacesCount ?? new SpacesCount(1),
      params.hasPayment ?? new HasPayment(false),
      params.methodId ?? null,
      params.allowedFeatures ?? new AllowedFeatures([]),
      params.hasRegisterForm ?? new HasRegisterForm(false),
      params.registerFormId ?? null,
      params.allowedUsers ?? new AllowedUsers(1),
      params.color ?? new Color(MotherCreator.random().internet.color()),
      params.isPrivate ?? new IsPrivate(false),
      params.isRegisterOpen ?? new IsRegisterOpen(true),
      params.homeSpaceId ?? new HomeSpaceId(UuidMother.random()),
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
