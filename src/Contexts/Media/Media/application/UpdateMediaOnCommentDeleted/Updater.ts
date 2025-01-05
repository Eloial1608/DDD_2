import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { TotalComments } from '@Media/Media/domain/ValueObjects/TotalComments'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: MediaRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const media = await this.repository.find(id)

    if (!media) return

    const updated = media.updateTotalComments(new TotalComments(media.totalComments.valueOf() - 1))

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
