import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (private readonly repository: SpaceMemberRepository, private readonly eventBus: EventBus) {}

  private readonly LIMIT = 50

  async run (spaceId: SpaceId) {
    for (;;) {
      const spaceMembers = await this.repository.search(
        new Criteria(
          new Filters([
            Filter.simple('spaceId', '=', spaceId.valueOf())
          ]),
          undefined,
          undefined,
          this.LIMIT
        )
      )

      for (const spaceMember of spaceMembers) {
        const deletedSpaceMember = spaceMember.delete()

        await this.repository.persist(deletedSpaceMember)
        await this.eventBus.publish(deletedSpaceMember.pullDomainEvents())
      }
    }
  }
}
