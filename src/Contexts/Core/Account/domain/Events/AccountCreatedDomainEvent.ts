import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Account } from '../Account'

type AccountCreatedDomainEventBody = {
    readonly id: string
    readonly name: string
    readonly email: string
    readonly createdAt: Date
}

export class AccountCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.account.v1.created'

  readonly id: string
  readonly name: string
  readonly email: string
  readonly createdAt: Date

  static {
    DomainEvent.derived.add(AccountCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: AccountCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(AccountCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.name = params.name
    this.email = params.email
  }

  static fromAggregate (account: Account): AccountCreatedDomainEvent {
    return new AccountCreatedDomainEvent({
      id: account.id.valueOf(),
      createdAt: account.createdAt.valueOf(),
      name: account.name.valueOf(),
      email: account.email.valueOf()

    })
  }

  toPrimitive (): AccountCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: AccountCreatedDomainEventBody, eventId: string, occurredOn: Date): AccountCreatedDomainEvent {
    return new AccountCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
