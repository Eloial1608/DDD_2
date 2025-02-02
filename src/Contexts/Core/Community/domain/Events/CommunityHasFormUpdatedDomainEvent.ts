import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Community } from '../Community'

type CommunityHasFormUpdatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly suffix: string
    readonly domain: Nullable<string>
    readonly allowsPayments: boolean
    readonly firstPaymentDone: boolean
    readonly spacesCount: number
    readonly hasPayment: boolean
    readonly allowedFeatures: string[]
    readonly hasRegisterForm: boolean
    readonly registerFormId: Nullable<string>
    readonly allowedUsers: number
    readonly color: string
    readonly isPrivate: boolean
    readonly isRegisterOpen: boolean
    readonly homeSpaceId: Nullable<string>
    readonly expiresAt: Date
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class CommunityHasFormUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.core.community.v1.has-form-updated'

  readonly id: string
  readonly name: string
  readonly suffix: string
  readonly domain: Nullable<string>
  readonly allowsPayments: boolean
  readonly firstPaymentDone: boolean
  readonly spacesCount: number
  readonly hasPayment: boolean
  readonly allowedFeatures: string[]
  readonly hasRegisterForm: boolean
  readonly registerFormId: Nullable<string>
  readonly allowedUsers: number
  readonly color: string
  readonly isPrivate: boolean
  readonly isRegisterOpen: boolean
  readonly homeSpaceId: Nullable<string>
  readonly expiresAt: Date
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(CommunityHasFormUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityHasFormUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityHasFormUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
    this.domain = params.domain
    this.registerFormId = params.registerFormId
    this.suffix = params.suffix
    this.allowsPayments = params.allowsPayments
    this.firstPaymentDone = params.firstPaymentDone
    this.spacesCount = params.spacesCount
    this.hasPayment = params.hasPayment
    this.allowedFeatures = params.allowedFeatures
    this.hasRegisterForm = params.hasRegisterForm
    this.allowedUsers = params.allowedUsers
    this.color = params.color
    this.isPrivate = params.isPrivate
    this.isRegisterOpen = params.isRegisterOpen
    this.homeSpaceId = params.homeSpaceId
    this.expiresAt = params.expiresAt
  }

  static fromAggregate (community: Community): CommunityHasFormUpdatedDomainEvent {
    return new CommunityHasFormUpdatedDomainEvent({
      id: community.id.valueOf(),
      createdAt: community.createdAt.valueOf(),
      updatedAt: community.updatedAt.valueOf(),
      name: community.name.valueOf(),
      suffix: community.suffix.valueOf(),
      allowsPayments: community.allowsPayments.valueOf(),
      firstPaymentDone: community.firstPaymentDone.valueOf(),
      spacesCount: community.spacesCount.valueOf(),
      hasPayment: community.hasPayment.valueOf(),
      allowedFeatures: community.allowedFeatures.valueOf().map(x => x.valueOf()),
      color: community.color.valueOf(),
      isPrivate: community.isPrivate.valueOf(),
      isRegisterOpen: community.isRegisterOpen.valueOf(),
      homeSpaceId: community.homeSpaceId?.valueOf(),
      expiresAt: community.expiresAt.valueOf(),
      domain: community.domain?.valueOf(),
      registerFormId: community.registerFormId?.valueOf(),
      hasRegisterForm: community.hasRegisterForm.valueOf(),
      allowedUsers: community.allowedUsers.valueOf()
    })
  }

  toPrimitive (): CommunityHasFormUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityHasFormUpdatedDomainEventBody, eventId: string, occurredOn: Date): CommunityHasFormUpdatedDomainEvent {
    return new CommunityHasFormUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
