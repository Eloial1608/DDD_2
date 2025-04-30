import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Form } from '../Form'

type FormDeletedDomainEventBody = {
  readonly id: string
  readonly name: string
  readonly isActive: boolean
  readonly content: object[]
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class FormDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.form.v1.deleted'

  readonly id: string
  readonly name: string
  readonly isActive: boolean
  readonly content: object[]
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(FormDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: FormDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(FormDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.communityId = params.communityId
    this.content = params.content
    this.isActive = params.isActive
    this.name = params.name
  }

  static fromAggregate (form: Form): FormDeletedDomainEvent {
    return new FormDeletedDomainEvent({
      id: form.id.valueOf(),
      createdAt: form.createdAt.valueOf(),
      updatedAt: form.updatedAt.valueOf(),
      communityId: form.communityId.valueOf(),
      content: form.content.toPrimitives(),
      isActive: form.isActive.valueOf(),
      name: form.name.valueOf()
    })
  }

  toPrimitive (): FormDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: FormDeletedDomainEventBody, eventId: string, occurredOn: Date): FormDeletedDomainEvent {
    return new FormDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
