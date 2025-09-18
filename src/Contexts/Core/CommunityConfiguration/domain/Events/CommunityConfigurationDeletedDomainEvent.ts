import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { CommunityConfiguration } from '../CommunityConfiguration'
import { Nullable } from '@Shared/domain/Nullable'

type CommunityConfigurationDeletedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>
}

export class CommunityConfigurationDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.communityconfiguration.v1.deleted'

  readonly id: string
  readonly communityId: Nullable<string>

  static {
    DomainEvent.derived.add(CommunityConfigurationDeletedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityConfigurationDeletedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityConfigurationDeletedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (communityconfiguration: CommunityConfiguration): CommunityConfigurationDeletedDomainEvent {
    return new CommunityConfigurationDeletedDomainEvent({
      id: communityconfiguration.id.valueOf(),
      communityId: communityconfiguration.communityId ? communityconfiguration.communityId.valueOf() : null
    })
  }

  toPrimitive (): CommunityConfigurationDeletedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityConfigurationDeletedDomainEventBody, eventId: string, occurredOn: Date): CommunityConfigurationDeletedDomainEvent {
    return new CommunityConfigurationDeletedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
