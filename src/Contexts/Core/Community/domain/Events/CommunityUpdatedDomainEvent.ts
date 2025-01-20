import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Community } from '../Community'

type CommunityUpdatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly suffix: string
    readonly mainId: Nullable<string>
    readonly parentId: Nullable<string>
    readonly domain: Nullable<string>
    readonly membersCount: number
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
    readonly expiresAt: Date
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class CommunityUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.community.v1.updated'

  readonly id: string
  readonly name: string
  readonly suffix: string
  readonly mainId: Nullable<string>
  readonly parentId: Nullable<string>
  readonly domain: Nullable<string>
  readonly membersCount: number
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
  readonly expiresAt: Date
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(CommunityUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
    this.parentId = params.parentId
    this.mainId = params.mainId
    this.domain = params.domain
    this.registerFormId = params.registerFormId
    this.suffix = params.suffix
    this.membersCount = params.membersCount
    this.firstPaymentDone = params.firstPaymentDone
    this.spacesCount = params.spacesCount
    this.hasPayment = params.hasPayment
    this.allowedFeatures = params.allowedFeatures
    this.hasRegisterForm = params.hasRegisterForm
    this.allowedUsers = params.allowedUsers
    this.color = params.color
    this.isPrivate = params.isPrivate
    this.isRegisterOpen = params.isRegisterOpen
    this.expiresAt = params.expiresAt
  }

  static fromAggregate (community: Community): CommunityUpdatedDomainEvent {
    return new CommunityUpdatedDomainEvent({
      id: community.id.valueOf(),
      createdAt: community.createdAt.valueOf(),
      updatedAt: community.updatedAt.valueOf(),
      name: community.name.valueOf(),
      mainId: community.mainId?.valueOf(),
      parentId: community.parentId?.valueOf(),
      suffix: community.suffix.valueOf(),
      membersCount: community.membersCount.valueOf(),
      firstPaymentDone: community.firstPaymentDone.valueOf(),
      spacesCount: community.spacesCount.valueOf(),
      hasPayment: community.hasPayment.valueOf(),
      allowedFeatures: community.allowedFeatures.valueOf().map(x => x.valueOf()),
      color: community.color.valueOf(),
      isPrivate: community.isPrivate.valueOf(),
      isRegisterOpen: community.isRegisterOpen.valueOf(),
      expiresAt: community.expiresAt.valueOf(),
      domain: community.domain?.valueOf(),
      registerFormId: community.registerFormId?.valueOf(),
      hasRegisterForm: community.hasRegisterForm.valueOf(),
      allowedUsers: community.allowedUsers.valueOf()

    })
  }

  toPrimitive (): CommunityUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityUpdatedDomainEventBody, eventId: string, occurredOn: Date): CommunityUpdatedDomainEvent {
    return new CommunityUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
