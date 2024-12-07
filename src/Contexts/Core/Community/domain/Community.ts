import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { Suffix } from './ValueObjects/Suffix'
import { Domain } from './ValueObjects/Domain'
import { MembersCount } from './ValueObjects/MembersCount'
import { FirstPaymentDone } from './ValueObjects/FirstPaymentDone'
import { SpacesCount } from './ValueObjects/SpacesCount'
import { HasPayment } from './ValueObjects/HasPayment'
import { AllowedFeatures } from './ValueObjects/AllowedFeatures'
import { HasRegisterForm } from './ValueObjects/HasRegisterForm'
import { RegisterFormId } from './ValueObjects/RegisterFormId'
import { AllowedUsers } from './ValueObjects/AllowedUsers'
import { Color } from './ValueObjects/Color'
import { IsPrivate } from './ValueObjects/IsPrivate'
import { IsRegisterOpen } from './ValueObjects/IsRegisterOpen'
import { HomeSpaceId } from './ValueObjects/HomeSpaceId'
import { ExpiresAt } from './ValueObjects/ExpiresAt'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { CommunityCreatedDomainEvent } from './Events/CommunityCreatedDomainEvent'
import { CommunityDeletedDomainEvent } from './Events/CommunityDeletedDomainEvent'
import { MethodId } from './ValueObjects/MethodId'

export class Community extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly name: Name,
        readonly suffix: Suffix,
        readonly domain: Nullable<Domain>,
        readonly membersCount: MembersCount,
        readonly firstPaymentDone: FirstPaymentDone,
        readonly spacesCount: SpacesCount,
        readonly hasPayment: HasPayment,
        readonly methodId: Nullable<MethodId>,
        readonly allowedFeatures: AllowedFeatures,
        readonly hasRegisterForm: HasRegisterForm,
        readonly registerFormId: Nullable<RegisterFormId>,
        readonly allowedUsers: AllowedUsers,
        readonly color: Color,
        readonly isPrivate: IsPrivate,
        readonly isRegisterOpen: IsRegisterOpen,
        readonly homeSpaceId: HomeSpaceId,
        readonly expiresAt: ExpiresAt,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    suffix: Suffix,
    color: Color,
    allowedFeatures: AllowedFeatures,
    allowedUsers: AllowedUsers,
    homeSpaceId: HomeSpaceId,
    expiresAt: ExpiresAt
  ): Community {
    const community = new Community(
      id,
      name,
      suffix,
      null,
      new MembersCount(0),
      new FirstPaymentDone(false),
      new SpacesCount(1),
      new HasPayment(false),
      null,
      allowedFeatures,
      new HasRegisterForm(false),
      null,
      allowedUsers,
      color,
      new IsPrivate(false),
      new IsRegisterOpen(true),
      homeSpaceId,
      expiresAt,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    community.record(CommunityCreatedDomainEvent.fromAggregate(community))

    return community
  }

  delete (): Community {
    const community = new Community(
      this.id,
      this.name,
      this.suffix,
      this.domain,
      this.membersCount,
      this.firstPaymentDone,
      this.spacesCount,
      this.hasPayment,
      this.methodId,
      this.allowedFeatures,
      this.hasRegisterForm,
      this.registerFormId,
      this.allowedUsers,
      this.color,
      this.isPrivate,
      this.isRegisterOpen,
      this.homeSpaceId,
      this.expiresAt,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    community.record(CommunityDeletedDomainEvent.fromAggregate(community))

    return community
  }
}
