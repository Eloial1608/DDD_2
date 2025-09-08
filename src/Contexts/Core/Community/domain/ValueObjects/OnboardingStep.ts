import { EnumValueObject } from '@Shared/domain/ValueObjects/EnumValueObject'
import { InvalidOnboardingStep } from '../Errors/InvalidOnboardingStep'

export enum ONBOARDING_STEPS {
    PROFILE = 'profile',
    THEME = 'theme',
    TEMPLATE = 'template',
    TITLES = 'titles'
}

export class OnboardingStep extends EnumValueObject<ONBOARDING_STEPS> {
  constructor (value: ONBOARDING_STEPS) {
    super(value, Object.values(ONBOARDING_STEPS))
  }

  protected throwErrorForInvalidValue (): void {
    throw new InvalidOnboardingStep(this)
  }
}
