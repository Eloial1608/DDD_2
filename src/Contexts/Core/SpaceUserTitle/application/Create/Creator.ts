import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { SpaceUserTitleAlreadyExistsById } from '@Core/SpaceUserTitle/domain/Errors/SpaceUserTitleAlreadyExistsById'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'
import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { TitleId } from '@Core/SpaceUserTitle/domain/ValueObjects/TitleId'
import { UserId } from '@Core/SpaceUserTitle/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceUserTitle/domain/ValueObjects/SpaceId'
import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'

export class Creator {
  constructor (private readonly repository: SpaceUserTitleRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    titleId: TitleId,
    userId: UserId,
    spaceId: SpaceId
  ) {
    
    await this.checkIfExists(id, communityId)

    const spaceUserTitle = SpaceUserTitle.create(
      id,
      communityId,
      titleId,
      userId,
      spaceId
    )

    await this.repository.persist(spaceUserTitle)
    await this.eventBus.publish(spaceUserTitle.pullDomainEvents())
  }

  private async checkIfExists (id: Id, communityId: CommunityId) {
    const existingById = await this.repository.find(id)

    if (existingById) throw new SpaceUserTitleAlreadyExistsById(id)
  }
}
