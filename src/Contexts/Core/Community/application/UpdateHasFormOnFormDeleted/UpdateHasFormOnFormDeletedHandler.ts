import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { FormDeletedDomainEvent } from '@Core/Form/domain/Events/FormDeletedDomainEvent'
import { HasRegisterForm } from '@Core/Community/domain/ValueObjects/HasRegisterForm'

export class UpdateHasFormOnFormDeletedHandler implements DomainEventSubscriber<FormDeletedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [FormDeletedDomainEvent]
  }

  async on (domainEvent: FormDeletedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.id),
      new HasRegisterForm(false)
    )
  }
}
