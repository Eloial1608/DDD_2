import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Suffix } from '../ValueObjects/Suffix'

export class CommunityAlreadyExistsBySuffix extends DomainError {
  protected code = 'community-already-exists'
  protected message

  constructor (suffix: Suffix) {
    super()
    this.message = `A community with suffix ${suffix} already exists`
  }
}
