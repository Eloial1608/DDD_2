import { DomainError } from '@Shared/domain/Errors/DomainError'

export class InvalidMaxOnSiteMembers extends DomainError {
  protected code = 'invalid-max-onsite-members'
  protected message

  constructor () {
    super()
    this.message = 'Max onsite members should be greater than total onsite members'
  }
}
