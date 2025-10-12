import { UserRepository } from '@Core/User/domain/UserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Shared/domain/SharedValueObjects/Community/CommunityId'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { PrincipalTitle } from '@Core/User/domain/ValueObjects/PrincipalTitle'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdaterPrincipalTitle {
  constructor (private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    principalTitle: Nullable<PrincipalTitle>,
    communityId: CommunityId
  ) {
    const user = await this.repository.find(id)

    if (!user || user.communityId.valueOf() !== communityId.valueOf()) throw new UserNotFound(id)

    const updatedUser = user.updatePrincipalTitle(
      principalTitle
    )

    await this.repository.persist(updatedUser)
    await this.eventBus.publish(updatedUser.pullDomainEvents())
  }
}
