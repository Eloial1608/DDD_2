import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class InvalidMethod extends InvalidArgumentError {
  code = 'invalid-method'
}
