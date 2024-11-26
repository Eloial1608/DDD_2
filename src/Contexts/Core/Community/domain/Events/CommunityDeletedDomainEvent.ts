import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Community } from '../Community'

type CommunityDeletedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly suffix: string
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
    readonly homeSpaceId: string
    readonly expiresAt: Date
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly deletedAt: Date
}

export class CommunityDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.core.community.v1.deleted'

  readonly id: string
  readonly name: string
  readonly suffix: string
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
  readonly homeSpaceId: string
  readonly expiresAt: Date
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly deletedAt: Date

  static {
    DomainEvent.derived.add(CommunityDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
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
    this.homeSpaceId = params.homeSpaceId
    this.expiresAt = params.expiresAt
    this.deletedAt = params.deletedAt
  }

  static fromAggregate (community: Community): CommunityDeletedDomainEvent {
    return new CommunityDeletedDomainEvent({
      id: community.id.valueOf(),
      createdAt: community.createdAt.valueOf(),
      updatedAt: community.updatedAt.valueOf(),
      name: community.name.valueOf(),
      suffix: community.suffix.valueOf(),
      membersCount: community.membersCount.valueOf(),
      firstPaymentDone: community.firstPaymentDone.valueOf(),
      spacesCount: community.spacesCount.valueOf(),
      hasPayment: community.hasPayment.valueOf(),
      allowedFeatures: community.allowedFeatures.valueOf().map(x => x.valueOf()),
      color: community.color.valueOf(),
      isPrivate: community.isPrivate.valueOf(),
      isRegisterOpen: community.isRegisterOpen.valueOf(),
      homeSpaceId: community.homeSpaceId.valueOf(),
      expiresAt: community.expiresAt.valueOf(),
      domain: community.domain?.valueOf(),
      registerFormId: community.registerFormId?.valueOf(),
      hasRegisterForm: community.hasRegisterForm.valueOf(),
      allowedUsers: community.allowedUsers.valueOf(),
      deletedAt: community.deletedAt!.valueOf()

    })
  }

  toPrimitive (): CommunityDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityDeletedDomainEventBody, eventId: string, occurredOn: Date): CommunityDeletedDomainEvent {
    return new CommunityDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
