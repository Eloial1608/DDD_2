import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class InvalidUsernameFormat extends InvalidArgumentError {
  code = 'invalid-username-format'
}
