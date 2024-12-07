import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Email } from '../ValueObjects/Email'

export class UserAlreadyExistsByEmail extends DomainError {
  protected code = 'user-already-exists'
  protected message

  constructor (email: Email) {
    super()
    this.message = `A user with email ${email} already exists`
  }
}
