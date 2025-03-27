import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Accessibility } from '../ValueObjects/Accessibility'

export class InvalidAccessibility extends DomainError {
  protected code = 'invalid-allowed-accessibility'
  protected message

  constructor (feature: Accessibility) {
    super()
    this.message = `The event accessibility ${feature.valueOf()} isn't valid`
  }
}
