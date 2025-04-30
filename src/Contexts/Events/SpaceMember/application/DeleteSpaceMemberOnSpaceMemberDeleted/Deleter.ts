import { SpaceMemberRepository } from '@Events/SpaceMember/domain/SpaceMemberRepository'
import { Id } from '@Events/SpaceMember/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (
    private readonly repository: SpaceMemberRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id
  ) {
    const spaceMember = await this.repository.find(id)

    if (!spaceMember) return

    const deleted = spaceMember.delete()

    await this.repository.delete(deleted)
    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
