import { UserTitleRepository } from '@Core/UserTitle/domain/UserTitleRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { UserTitleAlreadyExistsById } from '@Core/UserTitle/domain/Errors/UserTitleAlreadyExistsById'
import { UserTitle } from '@Core/UserTitle/domain/UserTitle'
import { CommunityId } from '@Core/UserTitle/domain/ValueObjects/CommunityId'
import { TitleId } from '@Core/UserTitle/domain/ValueObjects/TitleId'
import { UserId } from '@Core/UserTitle/domain/ValueObjects/UserId'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'

export class Creator {
  constructor (private readonly repository: UserTitleRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    titleId: TitleId,
    userId: UserId
  ) {
    await this.checkIfExists(id)

    const userTitle = UserTitle.create(
      id,
      communityId,
      titleId,
      userId
    )

    await this.repository.persist(userTitle)
    await this.eventBus.publish(userTitle.pullDomainEvents())
  }

  private async checkIfExists (id: Id) {
    const existingById = await this.repository.find(id)

    if (existingById) throw new UserTitleAlreadyExistsById(id)
  }
}
