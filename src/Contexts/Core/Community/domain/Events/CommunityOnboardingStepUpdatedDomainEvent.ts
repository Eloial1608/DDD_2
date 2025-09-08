import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Community } from '../Community'

type CommunityOnboardingStepUpdatedDomainEventBody = {
    readonly id: string
  }

export class CommunityOnboardingStepUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.core.community.v1.onboarding-step-updated'

  readonly id: string

  static {
    DomainEvent.derived.add(CommunityOnboardingStepUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityOnboardingStepUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityOnboardingStepUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
  }

  static fromAggregate (community: Community): CommunityOnboardingStepUpdatedDomainEvent {
    return new CommunityOnboardingStepUpdatedDomainEvent({
      id: community.id.valueOf()
    })
  }

  toPrimitive (): CommunityOnboardingStepUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityOnboardingStepUpdatedDomainEventBody, eventId: string, occurredOn: Date): CommunityOnboardingStepUpdatedDomainEventBody {
    return new CommunityOnboardingStepUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
