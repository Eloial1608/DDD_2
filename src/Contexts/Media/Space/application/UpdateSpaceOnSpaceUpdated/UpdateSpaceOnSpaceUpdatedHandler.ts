import { SpaceUpdatedDomainEvent } from '@Core/Space/domain/Events/SpaceUpdatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { Id } from '@Media/Space/domain/ValueObjects/Id'
import { Accessibility } from '@Media/Space/domain/ValueObjects/Accessibility'
import { Configuration } from '@Media/Space/domain/ValueObjects/Configuration'
import { Type } from '@Media/Space/domain/ValueObjects/Type'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'

export class UpdateSpaceOnSpaceUpdatedHandler implements DomainEventSubscriber <SpaceUpdatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceUpdatedDomainEvent]
  }

  async on (domainEvent: SpaceUpdatedDomainEvent): Promise<void> {
    if (domainEvent.type !== AllowedTypes.MEDIA) return

    await this.updater.run(
      new Id(domainEvent.id),
      new Accessibility(domainEvent.accessibility as AllowedAccessibilities),
      new Configuration(domainEvent.configuration as any),
      new Type(domainEvent.type)
    )
  }
}
