import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Type } from '../ValueObjects/Type'

export class InvalidType extends DomainError {
  protected code = 'invalid-allowed-type'
  protected message

  constructor (feature: Type) {
    super()
    this.message = `The product type ${feature.valueOf()} isn't valid`
  }
}
