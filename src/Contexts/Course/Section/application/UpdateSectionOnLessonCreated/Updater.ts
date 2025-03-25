import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { TotalLessons } from '@Course/Section/domain/ValueObjects/TotalLessons'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: SectionRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id
  ) {
    const section = await this.repository.find(id)

    if (!section) return

    const updated = section.updateTotalLessons(new TotalLessons(section.totalLessons.valueOf() + 1))

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
