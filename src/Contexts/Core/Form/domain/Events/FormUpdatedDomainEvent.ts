import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Form } from '../Form'

type FormUpdatedDomainEventBody = {
  readonly id: string
  readonly name: string
  readonly isActive: boolean
  readonly content: object[]
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class FormUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.form.v1.updated'

  readonly id: string
  readonly name: string
  readonly isActive: boolean
  readonly content: object[]
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(FormUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: FormUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(FormUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.communityId = params.communityId
    this.content = params.content
    this.isActive = params.isActive
    this.name = params.name
  }

  static fromAggregate (form: Form): FormUpdatedDomainEvent {
    return new FormUpdatedDomainEvent({
      id: form.id.valueOf(),
      createdAt: form.createdAt.valueOf(),
      updatedAt: form.updatedAt.valueOf(),
      communityId: form.communityId.valueOf(),
      content: form.content.toPrimitives(),
      isActive: form.isActive.valueOf(),
      name: form.name.valueOf()
    })
  }

  toPrimitive (): FormUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: FormUpdatedDomainEventBody, eventId: string, occurredOn: Date): FormUpdatedDomainEvent {
    return new FormUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
