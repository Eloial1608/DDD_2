import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { CommunityConfiguration } from '../CommunityConfiguration'

type CommunityConfigurationUpdatedDomainEventBody = {
    readonly id: string,
    readonly communityId: Nullable<string>
}

export class CommunityConfigurationUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.communityconfigurations.communityconfiguration.v1.updated'

  readonly id: string
  readonly communityId: Nullable<string>

  static {
    DomainEvent.derived.add(CommunityConfigurationUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: CommunityConfigurationUpdatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(CommunityConfigurationUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.communityId = params.communityId
  }

  static fromAggregate (communityconfiguration: CommunityConfiguration): CommunityConfigurationUpdatedDomainEvent {
    return new CommunityConfigurationUpdatedDomainEvent({
      id: communityconfiguration.id.valueOf(),
      communityId: communityconfiguration.communityId ? communityconfiguration.communityId.valueOf() : null
    })
  }

  toPrimitive (): CommunityConfigurationUpdatedDomainEvent {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: CommunityConfigurationUpdatedDomainEventBody, eventId: string, occurredOn: Date): CommunityConfigurationUpdatedDomainEvent {
    return new CommunityConfigurationUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
