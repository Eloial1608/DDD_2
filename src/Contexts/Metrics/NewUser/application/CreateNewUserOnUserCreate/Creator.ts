import { NewUser } from '@Metrics/NewUser/domain/NewUser'
import { NewUserRepository } from '@Metrics/NewUser/domain/NewUserRepository'
import { CommunityId } from '@Metrics/NewUser/domain/ValueObjects/CommunityId'
import { Id } from '@Metrics/NewUser/domain/ValueObjects/Id'
import { UserId } from '@Metrics/NewUser/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { v4 } from 'uuid'

export type IdGenerator = () => Id;

export class Creator {
  constructor (private readonly repository: NewUserRepository, private readonly eventBus: EventBus, private idGenerator: IdGenerator = () => new Id(v4())) {}

  async run (
    userId: UserId,
    communityId: CommunityId
  ) {
    const id = this.idGenerator()
    const existing = await this.repository.find(id)

    if (existing) return

    const newUser = NewUser.create(
      id,
      userId,
      communityId
    )

    await this.repository.persist(newUser)
    await this.eventBus.publish(newUser.pullDomainEvents())
  }
}
