import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Community } from '../Community'

type CommunityMembersCountUpdatedDomainEventBody = {
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
    readonly homeSpaceId: Nullable<string>
    readonly expiresAt: Date
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class CommunityMembersCountUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.core.community.v1.members-count-updated'

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
  readonly homeSpaceId: Nullable<string>
  readonly expiresAt: Date
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(CommunityMembersCountUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityMembersCountUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityMembersCountUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

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
  }

  static fromAggregate (community: Community): CommunityMembersCountUpdatedDomainEvent {
    return new CommunityMembersCountUpdatedDomainEvent({
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
      homeSpaceId: community.homeSpaceId?.valueOf(),
      expiresAt: community.expiresAt.valueOf(),
      domain: community.domain?.valueOf(),
      registerFormId: community.registerFormId?.valueOf(),
      hasRegisterForm: community.hasRegisterForm.valueOf(),
      allowedUsers: community.allowedUsers.valueOf()
    })
  }

  toPrimitive (): CommunityMembersCountUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityMembersCountUpdatedDomainEventBody, eventId: string, occurredOn: Date): CommunityMembersCountUpdatedDomainEvent {
    return new CommunityMembersCountUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
