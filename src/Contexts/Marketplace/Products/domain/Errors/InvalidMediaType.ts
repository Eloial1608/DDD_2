import { DomainError } from '@Shared/domain/Errors/DomainError'
import { MediaType } from '../ValueObjects/MediaType'

export class InvalidMediaType extends DomainError {
  protected code = 'invalid-allowed-type'
  protected message

  constructor (feature: MediaType) {
    super()
    this.message = `The product media type ${feature.valueOf()} isn't valid`
  }
}
