import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Id } from '../ValueObjects/Id'

export class TitleNotNull extends DomainError {
  protected code = 'title-not-null'
  protected message

  constructor (id: Id) {
    super()
    this.message = 'A thread without a threadParentId can\'t be null'
  }
}
