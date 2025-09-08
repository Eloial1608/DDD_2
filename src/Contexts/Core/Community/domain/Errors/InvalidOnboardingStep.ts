import { DomainError } from '@Shared/domain/Errors/DomainError'
import { OnboardingStep } from '../ValueObjects/OnboardingStep'

export class InvalidOnboardingStep extends DomainError {
  protected code = 'invalid-onboarding-step'
  protected message

  constructor (onboardingStep: OnboardingStep) {
    super()
    this.message = `The onboarding step ${onboardingStep.valueOf()} isn't valid`
  }
}
