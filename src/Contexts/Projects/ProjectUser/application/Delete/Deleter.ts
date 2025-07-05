import { Id } from '@Projects/ProjectUser/domain/ValueObjects/Id'
import { ProjectUserRepository } from '@Projects/ProjectUser/domain/ProjectUserRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
export class Deleter {
  constructor (private readonly repository: ProjectUserRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ): Promise<void> {
    const projectUser = await this.repository.find(id)

    if (!projectUser) return

    const deleted = projectUser.delete()

    await this.repository.delete(deleted)
    await this.eventBus.publish(deleted.pullDomainEvents())
  }
}
