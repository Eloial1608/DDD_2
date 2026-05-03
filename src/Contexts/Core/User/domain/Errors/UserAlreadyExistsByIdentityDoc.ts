import { DomainError } from '@Shared/domain/Errors/DomainError'
import { IdentityDoc } from '../ValueObjects/IdentityDoc/IdentityDoc'

export class UserAlreadyExistsByIdentityDoc extends DomainError {
  protected code = 'user-already-exists'
  protected message

  constructor (identityDoc: IdentityDoc) {
    super()
    this.message = `A user with identityDocType ${identityDoc.type.toString()} and identityDocNumber ${identityDoc.number.valueOf()} already exists`
  }
}