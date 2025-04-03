import { EventRepository } from '@Events/Event/domain/EventRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { Accessibility, EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'
import { Event } from '@Events/Event/domain/Event'
import { TotalOnlineMembers } from '@Events/Event/domain/ValueObjects/TotalOnlineMembers'
import { TotalOnSiteMembers } from '@Events/Event/domain/ValueObjects/TotalOnSiteMembers'

export class Updater {
  constructor (private readonly repository: EventRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    types: Accessibility[]
  ) {
    const event = await this.repository.find(id)

    if (!event) return

    let totalOnlineMembers = event.totalOnlineMembers
    let totalOnSiteMembers = event.totalOnSiteMembers

    for (const type of types) {
      if (this.isOnlineElegible(event, type)) totalOnlineMembers = new TotalOnlineMembers(totalOnlineMembers.valueOf() + 1)
      if (this.isOnSiteElegible(event, type)) totalOnSiteMembers = new TotalOnSiteMembers(totalOnSiteMembers.valueOf() + 1)
    }

    const updated = event.updateTotalMembers(totalOnSiteMembers, totalOnlineMembers)

    await this.repository.persist(updated)
    await this.eventBus.publish(updated.pullDomainEvents())
  }

  private isOnlineElegible (event: Event, type: Accessibility): boolean {
    if (![EventAccessibilities.ONLINE || EventAccessibilities.HYBRID].includes(type.valueOf())) return false
    if (![EventAccessibilities.ONLINE || EventAccessibilities.HYBRID].includes(event.accessibility.valueOf())) return false
    if (event.maxOnlineMembers && event.totalOnlineMembers.valueOf() + 1 > event.maxOnlineMembers.valueOf()) return false

    return true
  }

  private isOnSiteElegible (event: Event, type: Accessibility): boolean {
    if (![EventAccessibilities.ONSITE || EventAccessibilities.HYBRID].includes(type.valueOf())) return false
    if (![EventAccessibilities.ONSITE || EventAccessibilities.HYBRID].includes(event.accessibility.valueOf())) return false
    if (event.totalOnSiteMembers.valueOf() + 1 > event.maxOnSiteMembers.valueOf()) return false

    return true
  }
}
