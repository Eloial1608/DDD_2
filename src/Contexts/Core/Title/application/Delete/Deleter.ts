import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'
import { TitleRepository } from '@Core/Title/domain/TitleRepository'
import { CommunityId } from '@Core/Title/domain/ValueObjects/CommunityId'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (private readonly repository: TitleRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId) {
    const title = await this.repository.find(id)

    if (!title || title.communityId.valueOf() !== communityId.valueOf()) throw new TitleNotFound(id)

    const deletedTitle = title.delete()

    await this.repository.persist(deletedTitle)
    await this.eventBus.publish(deletedTitle.pullDomainEvents())
  }
}