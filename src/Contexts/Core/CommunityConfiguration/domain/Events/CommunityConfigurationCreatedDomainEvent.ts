import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { CommunityConfiguration } from '../CommunityConfiguration'
import { Nullable } from '@Shared/domain/Nullable'

type CommunityConfigurationCreatedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>
}

export class CommunityConfigurationCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.core.communityconfiguration.v1.created'

  readonly id: string
  readonly communityId: Nullable<string>

  static {
    DomainEvent.derived.add(CommunityConfigurationCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityConfigurationCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(CommunityConfigurationCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (communityconfiguration: CommunityConfiguration): CommunityConfigurationCreatedDomainEvent {
    return new CommunityConfigurationCreatedDomainEvent({
      id: communityconfiguration.id.valueOf(),
      communityId: communityconfiguration.communityId ? communityconfiguration.communityId.valueOf() : null
    })
  }

  toPrimitive (): CommunityConfigurationCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityConfigurationCreatedDomainEventBody, eventId: string, occurredOn: Date): CommunityConfigurationCreatedDomainEvent {
    return new CommunityConfigurationCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
