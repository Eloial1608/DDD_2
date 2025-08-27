import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { ThemeRepository } from '@Core/Theme/domain/ThemeRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/Theme/domain/ValueObjects/CommunityId'

export class Deleter {
  constructor (private readonly repository: ThemeRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId
  ): Promise<void> {
    const existingTheme = await this.repository.find(id)
    if (!existingTheme || existingTheme.communityId!.valueOf() !== communityId.valueOf()) return

    const theme = existingTheme.delete()

    await this.repository.delete(theme)

    await this.eventBus.publish(theme.pullDomainEvents())
  }
}
