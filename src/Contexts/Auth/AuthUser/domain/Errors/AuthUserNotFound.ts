import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class AuthUserNotFound extends InvalidArgumentError {
  code = 'auth-user-not-found'
}
