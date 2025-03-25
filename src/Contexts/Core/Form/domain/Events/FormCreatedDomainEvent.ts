import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Form } from '../Form'

type FormCreatedDomainEventBody = {
  readonly id: string
  readonly name: string
  readonly isActive: boolean
  readonly content: object[]
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class FormCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.form.v1.created'

  readonly id: string
  readonly name: string
  readonly isActive: boolean
  readonly content: object[]
  readonly communityId: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(FormCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: FormCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(FormCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
    this.communityId = params.communityId
    this.content = params.content
    this.isActive = params.isActive
    this.name = params.name
  }

  static fromAggregate (form: Form): FormCreatedDomainEvent {
    return new FormCreatedDomainEvent({
      id: form.id.valueOf(),
      createdAt: form.createdAt.valueOf(),
      updatedAt: form.updatedAt.valueOf(),
      communityId: form.communityId.valueOf(),
      content: form.content.toPrimitives(),
      isActive: form.isActive.valueOf(),
      name: form.name.valueOf()
    })
  }

  toPrimitive (): FormCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: FormCreatedDomainEventBody, eventId: string, occurredOn: Date): FormCreatedDomainEvent {
    return new FormCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
