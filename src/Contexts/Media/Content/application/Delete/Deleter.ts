import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { ContentRepository } from '@Media/Content/domain/ContentRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'

export class Deleter {
  constructor (private readonly repository: ContentRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId
  ): Promise<void> {
    const existingContent = await this.repository.find(id)
    if (!existingContent || existingContent.communityId.valueOf() !== communityId.valueOf()) return

    const content = existingContent.delete()

    await this.repository.delete(content)

    await this.eventBus.publish(content.pullDomainEvents())
  }
}
