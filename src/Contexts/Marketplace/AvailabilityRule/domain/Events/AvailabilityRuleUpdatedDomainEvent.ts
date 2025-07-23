import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import type { AvailabilityRule } from '../AvailabilityRule'

export class AvailabilityRuleUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'app.gathered.marketplace.availabilityRule.v1.updated'

  readonly id: string
  readonly productId: string
  readonly weekday: number
  readonly startTime: string
  readonly endTime: string
  readonly slotDurationMinutes: number

  constructor (
    aggregateId: string,
    {
      productId,
      weekday,
      startTime,
      endTime,
      slotDurationMinutes
    }: {
      productId: string
      weekday: number
      startTime: string
      endTime: string
      slotDurationMinutes: number
    },
    eventId?: string,
    occurredOn?: Date
  ) {
    super(AvailabilityRuleUpdatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn)
    this.id = aggregateId
    this.productId = productId
    this.weekday = weekday
    this.startTime = startTime
    this.endTime = endTime
    this.slotDurationMinutes = slotDurationMinutes
  }

  static fromAggregate (rule: AvailabilityRule): AvailabilityRuleUpdatedDomainEvent {
    return new AvailabilityRuleUpdatedDomainEvent(rule.id.valueOf(), {
      productId: rule.productId.valueOf(),
      weekday: rule.weekday.valueOf(),
      startTime: rule.startTime.valueOf(),
      endTime: rule.endTime.valueOf(),
      slotDurationMinutes: rule.slotDurationMinutes.valueOf()
    })
  }

  toPrimitive () {
    return {
      id: this.id,
      productId: this.productId,
      weekday: this.weekday,
      startTime: this.startTime,
      endTime: this.endTime,
      slotDurationMinutes: this.slotDurationMinutes
    }
  }
}
