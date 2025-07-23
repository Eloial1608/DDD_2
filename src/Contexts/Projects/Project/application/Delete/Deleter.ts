import { NotAllowedToPersistProject } from '@Projects/Project/domain/Errors/NotAllowedToPersistProduct'
import { ProjectRepository } from '@Projects/Project/domain/ProjectRepository'
import { CommunityId } from '@Projects/Project/domain/ValueObjects/CommunityId'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { UserId } from '@Projects/Project/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
export class Deleter {
  constructor (private readonly repository: ProjectRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId
  ): Promise<void> {
    const existingProject = await this.repository.find(id)
    if (!existingProject || existingProject.communityId.valueOf() !== communityId.valueOf()) return

    if (existingProject.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistProject(id)

    const project = existingProject.delete()

    await this.repository.persist(project)

    await this.eventBus.publish(project.pullDomainEvents())
  }
}
