import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'
import { Nullable } from '@Shared/domain/Nullable'

type UserIsAdminUpdatedDomainEventBody = {
  readonly id: string
  readonly mainId: string
  readonly name: string
  readonly username: string
  readonly pictureUrl: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly isAdmin: boolean
  readonly isOwner: boolean
  readonly communityId: string
}

export class UserIsAdminUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.media.user.v1.is-admin-updated'

  readonly id: string
  readonly mainId: string
  readonly name: string
  readonly username: string
  readonly isAdmin: boolean
  readonly isOwner: boolean
  readonly pictureUrl: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserIsAdminUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserIsAdminUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserIsAdminUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.mainId = params.mainId
    this.name = params.name
    this.username = params.username
    this.communityId = params.communityId
    this.pictureUrl = params.pictureUrl
    this.bannerUrl = params.bannerUrl
    this.isAdmin = params.isAdmin
    this.isOwner = params.isOwner
  }

  static fromAggregate (user: User): UserIsAdminUpdatedDomainEvent {
    return new UserIsAdminUpdatedDomainEvent({
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      name: user.name.valueOf(),
      isAdmin: user.isAdmin.valueOf(),
      isOwner: user.isOwner.valueOf(),
      pictureUrl: user.pictureUrl?.valueOf(),
      bannerUrl: user.bannerUrl?.valueOf(),
      username: user.username.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserIsAdminUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserIsAdminUpdatedDomainEventBody, eventId: string, occurredOn: Date): UserIsAdminUpdatedDomainEvent {
    return new UserIsAdminUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
