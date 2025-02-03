import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { FormRepository } from '@Core/Form/domain/FormRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'
import { FormNotFound } from '@Core/Form/domain/Errors/FormNotFound'
export class Deleter {
  constructor (private readonly repository: FormRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId): Promise<void> {
    const existingForm = await this.repository.find(id)

    if (!existingForm || existingForm.communityId.valueOf() !== communityId.valueOf()) throw new FormNotFound(id)

    const form = existingForm.delete()

    await this.repository.persist(form)

    await this.eventBus.publish(form.pullDomainEvents())
  }
}
