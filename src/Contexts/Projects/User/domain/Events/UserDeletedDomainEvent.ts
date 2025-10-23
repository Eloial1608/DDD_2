import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'
import { Nullable } from '@Shared/domain/Nullable'

type UserDeletedDomainEventBody = {
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

export class UserDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.Projects.user.v1.deleted'

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
    DomainEvent.derived.add(UserDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

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

  static fromAggregate (user: User): UserDeletedDomainEvent {
    return new UserDeletedDomainEvent({
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

  toPrimitive (): UserDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserDeletedDomainEventBody, eventId: string, occurredOn: Date): UserDeletedDomainEvent {
    return new UserDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
