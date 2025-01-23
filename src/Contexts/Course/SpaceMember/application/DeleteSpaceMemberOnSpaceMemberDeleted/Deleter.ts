import { SpaceMemberRepository } from '@Course/SpaceMember/domain/SpaceMemberRepository'
import { Id } from '@Course/SpaceMember/domain/ValueObjects/Id'
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
