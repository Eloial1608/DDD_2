import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateOnboardingStepCommand implements Command {
  constructor (
        readonly id: string,
        readonly onboardingStep: string
  ) {}
}
