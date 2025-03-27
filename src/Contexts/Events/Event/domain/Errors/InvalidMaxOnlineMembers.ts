import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidMaxOnlineMembers extends DomainError {
  protected code = 'invalid-max-online-members'
  protected message

  constructor () {
    super()
    this.message = 'Max online members should be greater than total online members'
  }
}
