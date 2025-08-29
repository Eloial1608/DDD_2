import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class InvalidTitlenameFormat extends InvalidArgumentError {
  code = 'invalid-titlename-format'
}
