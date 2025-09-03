import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
import { Id } from '@Core/SpaceUserTitle/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { SpaceUserTitleNotFound } from '@Core/SpaceUserTitle/domain/Errors/SpaceUserTitleNotFound'
import { TitleId } from '@Core/SpaceUserTitle/domain/ValueObjects/TitleId'

export class Updater {
  constructor (private readonly repository: SpaceUserTitleRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    titleId: TitleId,
  ) {
    const spaceUserTitle = await this.repository.find(id)

    if (!spaceUserTitle || spaceUserTitle.communityId.valueOf() !== communityId.valueOf()) throw new SpaceUserTitleNotFound(id)

    const updatedSpaceUserTitle = spaceUserTitle.update(
      id,
      titleId
    )

    await this.repository.persist(updatedSpaceUserTitle)
    await this.eventBus.publish(updatedSpaceUserTitle.pullDomainEvents())
  }
}
