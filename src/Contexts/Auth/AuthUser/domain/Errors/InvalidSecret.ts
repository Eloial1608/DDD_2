import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class InvalidSecret extends InvalidArgumentError {
  code = 'invalid-secret'
}
