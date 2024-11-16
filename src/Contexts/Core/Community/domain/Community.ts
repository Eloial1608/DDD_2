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
import { PlanId } from './ValueObjects/PlanId'
import { AllowedUsers } from './ValueObjects/AllowedUsers'
import { Color } from './ValueObjects/Color'
import { IsPrivate } from './ValueObjects/IsPrivate'
import { IsRegisterOpen } from './ValueObjects/IsRegisterOpen'
import { HomeSpaceId } from './ValueObjects/HomeSpaceId'
import { ExpiresAt } from './ValueObjects/ExpiresAt'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'

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
        readonly allowedFeatures: AllowedFeatures,
        readonly hasRegisterForm: HasRegisterForm,
        readonly registerFormId: Nullable<RegisterFormId>,
        readonly planId: PlanId,
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
}
