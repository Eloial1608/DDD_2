import { DomainError } from '@Shared/domain/Errors/DomainError'
import { SharedAccessibility } from '../SharedValueObjects/Space/SharedAccessibility'

export class InvalidSpaceAccessibility extends DomainError {
  protected code = 'invalid-allowed-accessibility'
  protected message

  constructor (feature: SharedAccessibility) {
    super()
    this.message = `The space accessibility ${feature.valueOf()} isn't valid`
  }
}
