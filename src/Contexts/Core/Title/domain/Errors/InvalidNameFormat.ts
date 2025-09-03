import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class InvalidNameFormat extends InvalidArgumentError {
  code = 'invalid-name-format'
}
