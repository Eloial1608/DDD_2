import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { FormRepository } from '@Core/Form/domain/FormRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'
import { FormNotFound } from '@Core/Form/domain/Errors/FormNotFound'
import { FormContents } from '@Core/Form/domain/ValueObjects/FormContent'
import { Name } from '@Core/Form/domain/ValueObjects/Name'
import { IsActive } from '@Core/Form/domain/ValueObjects/IsActive'

type Params = {
    id: Id,
    name: Name
    content: FormContents
    communityId: CommunityId
    isActive: IsActive
}

export class Updater {
  constructor (private readonly repository: FormRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const form = await this.repository.find(params.id)

    if (!form || form.communityId.valueOf() !== params.communityId.valueOf()) throw new FormNotFound(params.id)

    const updatedForm = form.update(params.name, params.content, params.isActive)

    await this.repository.persist(updatedForm)

    await this.eventBus.publish(updatedForm.pullDomainEvents())
  }
}
