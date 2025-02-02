import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { FormCreatedDomainEvent } from '@Core/Form/domain/Events/FormCreatedDomainEvent'
import { HasRegisterForm } from '@Core/Community/domain/ValueObjects/HasRegisterForm'
import { RegisterFormId } from '@Core/Community/domain/ValueObjects/RegisterFormId'

export class UpdateHasFormOnFormCreatedHandler implements DomainEventSubscriber<FormCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [FormCreatedDomainEvent]
  }

  async on (domainEvent: FormCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.id),
      new HasRegisterForm(true),
      new RegisterFormId(domainEvent.id)
    )
  }
}
