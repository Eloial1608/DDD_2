import { DomainError } from '@Shared/domain/Errors/DomainError'
import { RenovationTypeValues } from '../SharedValueObjects/SharedRenovationType'

export class InvalidRenovationTypeValue extends DomainError {
  protected code = 'invalid-allowed-renovation-type'
  protected message

  constructor (renovationType: RenovationTypeValues) {
    super()
    this.message = `The renovationType ${renovationType.valueOf()} isn't valid`
  }
}
