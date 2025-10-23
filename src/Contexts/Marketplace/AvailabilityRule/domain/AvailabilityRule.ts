import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import type { AvailabilityRuleId } from './ValueObjects/AvailabilityRuleId'
import type { ProductId } from './ValueObjects/ProductId'
import type { Weekday } from './ValueObjects/Weekday'
import type { Time } from './ValueObjects/Time'
import type { SlotDurationMinutes } from './ValueObjects/SlotDurationMinutes'
import { AvailabilityRuleCreatedDomainEvent } from './Events/AvailabilityRuleCreatedDomainEvent'
import { AvailabilityRuleUpdatedDomainEvent } from './Events/AvailabilityRuleUpdatedDomainEvent'
import { AvailabilityRuleDeletedDomainEvent } from './Events/AvailabilityRuleDeletedDomainEvent'

export class AvailabilityRule extends AggregateRoot {
  constructor (
    readonly id: AvailabilityRuleId,
    readonly productId: ProductId,
    readonly weekday: Weekday,
    readonly startTime: Time,
    readonly endTime: Time,
    readonly slotDurationMinutes: SlotDurationMinutes
  ) {
    super()
  }

  static create (
    id: AvailabilityRuleId,
    productId: ProductId,
    weekday: Weekday,
    startTime: Time,
    endTime: Time,
    slotDurationMinutes: SlotDurationMinutes
  ): AvailabilityRule {
    const rule = new AvailabilityRule(id, productId, weekday, startTime, endTime, slotDurationMinutes)
    rule.record(AvailabilityRuleCreatedDomainEvent.fromAggregate(rule))
    return rule
  }

  update (
    weekday: Weekday,
    startTime: Time,
    endTime: Time,
    slotDurationMinutes: SlotDurationMinutes
  ): AvailabilityRule {
    const updated = new AvailabilityRule(
      this.id,
      this.productId,
      weekday,
      startTime,
      endTime,
      slotDurationMinutes
    )
    updated.record(AvailabilityRuleUpdatedDomainEvent.fromAggregate(updated))
    return updated
  }

  delete (): AvailabilityRule {
    const deleted = new AvailabilityRule(
      this.id,
      this.productId,
      this.weekday,
      this.startTime,
      this.endTime,
      this.slotDurationMinutes
    )
    deleted.record(AvailabilityRuleDeletedDomainEvent.fromAggregate(deleted))
    return deleted
  }
}
