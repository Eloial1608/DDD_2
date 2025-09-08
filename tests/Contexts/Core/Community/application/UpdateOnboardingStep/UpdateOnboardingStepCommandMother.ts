import { UpdateOnboardingStepCommand } from '@Core/Community/application/UpdateOnboardingStep/UpdateOnboardingStepCommand'
import { Community } from '@Core/Community/domain/Community'

export class UpdateOnboardingStepCommandMother {
  static updateOnboardingStep (
    id: string,
    onboardingStep: string
  ): UpdateOnboardingStepCommand {
    return new UpdateOnboardingStepCommand(
      id,
      onboardingStep
    )
  }

  static fromAggregate (community: Community): UpdateOnboardingStepCommand {
    return this.updateOnboardingStep(
      community.id.valueOf(),
      community.onboardingStep.valueOf()
    )
  }
}
