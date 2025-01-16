import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Community } from '../Community'

type CommunitySubcommunitiesCountUpdatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly suffix: string
    readonly parentId: Nullable<string>
    readonly mainId: Nullable<string>
    readonly domain: Nullable<string>
    readonly subcommunitiesCount: number
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

export class CommunitySubcommunitiesCountUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.core.community.v1.subcommunities-count-updated'

  readonly id: string
  readonly name: string
  readonly suffix: string
  readonly parentId: Nullable<string>
  readonly mainId: Nullable<string>
  readonly domain: Nullable<string>
  readonly subcommunitiesCount: number
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
    DomainEvent.derived.add(CommunitySubcommunitiesCountUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunitySubcommunitiesCountUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunitySubcommunitiesCountUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
    this.parentId = params.parentId
    this.mainId = params.mainId
    this.domain = params.domain
    this.registerFormId = params.registerFormId
    this.suffix = params.suffix
    this.subcommunitiesCount = params.subcommunitiesCount
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

  static fromAggregate (community: Community): CommunitySubcommunitiesCountUpdatedDomainEvent {
    return new CommunitySubcommunitiesCountUpdatedDomainEvent({
      id: community.id.valueOf(),
      createdAt: community.createdAt.valueOf(),
      updatedAt: community.updatedAt.valueOf(),
      name: community.name.valueOf(),
      parentId: community.parentId?.valueOf(),
      mainId: community.mainId?.valueOf(),
      suffix: community.suffix.valueOf(),
      subcommunitiesCount: community.subcommunitiesCount.valueOf(),
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

  toPrimitive (): CommunitySubcommunitiesCountUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunitySubcommunitiesCountUpdatedDomainEventBody, eventId: string, occurredOn: Date): CommunitySubcommunitiesCountUpdatedDomainEvent {
    return new CommunitySubcommunitiesCountUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
