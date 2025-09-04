import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { TitleRepository } from '@Core/Title/domain/TitleRepository'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { CommunityId } from '@Core/Title/domain/ValueObjects/CommunityId'
import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'
import { TitleImageUrl } from '@Core/Title/domain/ValueObjects/TitleImageUrl'

export class Updater {
  constructor (private readonly repository: TitleRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    name: Name,
    communityId: CommunityId,
    titleImageUrl: Nullable<TitleImageUrl>
  ) {
    const title = await this.repository.find(id)

    if (!title || title.communityId.valueOf() !== communityId.valueOf()) throw new TitleNotFound(id)

    const updatedTitle = title.update(
      name,
      titleImageUrl
    )

    await this.repository.persist(updatedTitle)
    await this.eventBus.publish(updatedTitle.pullDomainEvents())
  }
}
