import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { Thread } from '../Thread'

type ThreadUpdatedDomainEventBody = {
    readonly id: string,
    readonly communityId: string,
    readonly userId: string,
    readonly title: Nullable<string>,
    readonly bannerUrl: Nullable<string>,
    readonly isPaid: boolean,
    readonly price: Nullable<{value: number, currency: string}>
}

export class ThreadUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.threads.thread.v1.updated'

  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly isPaid: boolean
  readonly price: Nullable<{value: number, currency: string}>

  static {
    DomainEvent.derived.add(ThreadUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: ThreadUpdatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(ThreadUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
    this.userId = params.userId
    this.title = params.title
    this.bannerUrl = params.bannerUrl
    this.isPaid = params.isPaid
    this.price = params.price
  }

  static fromAggregate (thread: Thread): ThreadUpdatedDomainEvent {
    return new ThreadUpdatedDomainEvent({
      id: thread.id.valueOf(),
      communityId: thread.communityId.valueOf(),
      userId: thread.userId.valueOf(),
      title: thread.title?.valueOf(),
      isPaid: thread.isPaid.valueOf(),
      price: thread.price?.value != null
        ? {
            value: thread.price.value.valueOf(),
            currency: thread.price.currency.valueOf()
          }
        : undefined,
      bannerUrl: thread.bannerUrl?.valueOf()

    })
  }

  toPrimitive (): ThreadUpdatedDomainEvent {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: ThreadUpdatedDomainEventBody, eventId: string, occurredOn: Date): ThreadUpdatedDomainEvent {
    return new ThreadUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
