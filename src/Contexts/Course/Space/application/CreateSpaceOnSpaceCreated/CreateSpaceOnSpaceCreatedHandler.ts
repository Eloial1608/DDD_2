import { SpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { Id } from '@Course/Space/domain/ValueObjects/Id'
import { CommunityId } from '@Course/Space/domain/ValueObjects/CommunityId'
import { Accessibility } from '@Course/Space/domain/ValueObjects/Accessibility'
import { Configuration } from '@Course/Space/domain/ValueObjects/Configuration'
import { Type } from '@Course/Space/domain/ValueObjects/Type'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'

export class CreateSpaceOnSpaceCreatedHandler implements DomainEventSubscriber <SpaceCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceCreatedDomainEvent]
  }

  async on (domainEvent: SpaceCreatedDomainEvent): Promise<void> {
    if (domainEvent.type !== AllowedTypes.COURSES) return

    await this.creator.run(
      new Id(domainEvent.id),
      new CommunityId(domainEvent.communityId),
      new Accessibility(domainEvent.accessibility as AllowedAccessibilities),
      new Configuration(domainEvent.configuration as any),
      new Type(domainEvent.type)
    )
  }
}
