import { DomainError } from '@Shared/domain/Errors/DomainError'
import { EntityType } from '../EntityType'

export class InvalidType extends DomainError {
  protected code = 'invalid-allowed-type'
  protected message

  constructor (feature: EntityType) {
    super()
    this.message = `The entity type ${feature.valueOf()} isn't valid`
  }
}
