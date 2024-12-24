import { DomainError } from '@Shared/domain/Errors/DomainError'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'

export class InvalidConfigurationType extends DomainError {
  protected code = 'invalid-configuration-type'
  protected message

  constructor (feature: AllowedTypes) {
    super()
    this.message = `The configuration type ${feature} isn't valid`
  }
}
