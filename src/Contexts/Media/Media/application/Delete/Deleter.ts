import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Media/Media/domain/ValueObjects/CommunityId'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'
import { NotAllowedToPersistMedia } from '@Media/Media/domain/Errors/NotAllowedToPersistMedia'
export class Deleter {
  constructor (private readonly repository: MediaRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId
  ): Promise<void> {
    const existingMedia = await this.repository.find(id)
    if (!existingMedia || existingMedia.communityId.valueOf() !== communityId.valueOf()) return

    if (existingMedia.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistMedia(id)

    const media = existingMedia.delete()

    await this.repository.persist(media)

    await this.eventBus.publish(media.pullDomainEvents())
  }
}
