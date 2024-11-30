import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class InvalidEmailFormat extends InvalidArgumentError {
  code = 'invalid-email-format'
}
