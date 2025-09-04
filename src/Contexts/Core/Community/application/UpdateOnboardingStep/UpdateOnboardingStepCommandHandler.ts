import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { UpdateOnboardingStepCommand } from './UpdateOnboardingStepCommand'
import { ONBOARDING_STEPS, OnboardingStep } from '@Core/Community/domain/ValueObjects/OnboardingStep'

export class UpdateOnboardingStepCommandHandler implements CommandHandler<UpdateOnboardingStepCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateOnboardingStepCommand
  }

  async handle (command: UpdateOnboardingStepCommand): Promise<void> {
    await this.updater.run({
      id: new Id(command.id),
      onboardingStep: new OnboardingStep(command.onboardingStep as ONBOARDING_STEPS)
    })
  }
}
