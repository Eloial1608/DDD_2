import { DomainError } from '@Shared/domain/Errors/DomainError'
import { AllowedMediaTypes } from '../ValueObjects/Type'

export class InvalidMediaType extends DomainError {
  protected code = 'invalid-media-type'
  protected message

  constructor (type: AllowedMediaTypes) {
    super()
    this.message = `The media typ ${type} is invalid`
  }
}
