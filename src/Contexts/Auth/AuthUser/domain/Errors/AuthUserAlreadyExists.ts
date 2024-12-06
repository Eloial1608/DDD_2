import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export class AuthUserAlreadyExists extends InvalidArgumentError {
  code = 'auth-user-already-exists'
}
