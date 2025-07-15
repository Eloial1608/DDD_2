import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { SpaceOrderedIds } from '../../domain/ValueObjects/SpaceOrderedIds'

type Params = {
    id: Id
    spaceOrderedIds: SpaceOrderedIds
}

export class Updater {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const community = await this.repository.find(params.id)

    if (!community) throw new CommunityNotFound(params.id)

    const modified = community.updateSpaceOrderedIds(
      params.spaceOrderedIds
    )

    await this.repository.persist(modified)

    await this.eventBus.publish(modified.pullDomainEvents())
  }
}
