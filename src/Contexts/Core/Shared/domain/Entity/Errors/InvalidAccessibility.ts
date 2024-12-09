import { DomainError } from '@Shared/domain/Errors/DomainError'
import { EntityAccessibility } from '../EntityAccessibility'

export class InvalidAccessibility extends DomainError {
  protected code = 'invalid-allowed-accessibility'
  protected message

  constructor (feature: EntityAccessibility) {
    super()
    this.message = `The entity accessibility ${feature.valueOf()} isn't valid`
  }
}
