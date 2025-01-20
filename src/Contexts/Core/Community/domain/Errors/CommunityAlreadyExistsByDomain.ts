import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Domain } from '../ValueObjects/Domain'

export class CommunityAlreadyExistsByDomain extends DomainError {
  protected code = 'community-already-exists'
  protected message

  constructor (domain: Domain) {
    super()
    this.message = `A community with domain ${domain} already exists`
  }
}
