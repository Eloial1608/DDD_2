import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'
import { Nullable } from '@Shared/domain/Nullable'

type UserCreatedDomainEventBody = {
  readonly id: string
  readonly mainId: string
  readonly name: string
  readonly username: string
  readonly pictureUrl: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly email:string
  readonly isAdmin: boolean
  readonly isOwner: boolean
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.user.v1.created'

  readonly id: string
  readonly mainId: string
  readonly name: string
  readonly username: string
  readonly email:string
  readonly isAdmin: boolean
  readonly isOwner: boolean
  readonly pictureUrl: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(UserCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.mainId = params.mainId
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.name = params.name
    this.username = params.username
    this.email = params.email
    this.communityId = params.communityId
    this.pictureUrl = params.pictureUrl
    this.bannerUrl = params.bannerUrl
    this.isAdmin = params.isAdmin
    this.isOwner = params.isOwner
  }

  static fromAggregate (user: User): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      id: user.id.valueOf(),
      mainId: user.mainId.valueOf(),
      createdAt: user.createdAt.valueOf(),
      updatedAt: user.updatedAt.valueOf(),
      name: user.name.valueOf(),
      isAdmin: user.isAdmin.valueOf(),
      isOwner: user.isOwner.valueOf(),
      pictureUrl: user.pictureUrl?.valueOf(),
      bannerUrl: user.bannerUrl?.valueOf(),
      username: user.username.valueOf(),
      email: user.email.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserCreatedDomainEventBody, eventId: string, occurredOn: Date): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
