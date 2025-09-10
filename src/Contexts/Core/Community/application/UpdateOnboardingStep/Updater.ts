import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { OnboardingStep } from '@Core/Community/domain/ValueObjects/OnboardingStep'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'

type Params = {
    id: Id
    onboardingStep: OnboardingStep
}

export class Updater {
  constructor (private readonly repository: CommunityRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const community = await this.repository.find(params.id)

    if (!community) throw new CommunityNotFound(params.id)

    const modified = community.updateOnboardingStep(
      params.onboardingStep
    )

    await this.repository.persist(modified)

    await this.eventBus.publish(modified.pullDomainEvents())
  }
}
