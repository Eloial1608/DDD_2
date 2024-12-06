import { DomainError } from '@Shared/domain/Errors/DomainError'
import { PlanRenovationTypeValues } from '../PlanRenovationType'

export class InvalidRenovationTypeValue extends DomainError {
  protected code = 'invalid-allowed-renovation-type'
  protected message

  constructor (renovationType: PlanRenovationTypeValues) {
    super()
    this.message = `The renovationType ${renovationType.valueOf()} isn't valid`
  }
}
