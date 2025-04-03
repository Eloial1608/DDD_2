import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'
import { Nullable } from '@Shared/domain/Nullable'

type UserUpdatedDomainEventBody = {
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

export class UserUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.threads.user.v1.updated'

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
    DomainEvent.derived.add(UserUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

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

  static fromAggregate (user: User): UserUpdatedDomainEvent {
    return new UserUpdatedDomainEvent({
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

  toPrimitive (): UserUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserUpdatedDomainEventBody, eventId: string, occurredOn: Date): UserUpdatedDomainEvent {
    return new UserUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
