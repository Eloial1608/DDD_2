import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Accessibility } from '../ValueObjects/Accessibility'

export class InvalidAccessibilityPrice extends DomainError {
  protected code = 'invalid-allowed-accessibility-price'
  protected message

  constructor (feature: Accessibility) {
    super()
    this.message = `The space accessibility ${feature.valueOf()} must have a price`
  }
}
