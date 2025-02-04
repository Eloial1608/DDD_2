import { DomainError } from '@Shared/domain/Errors/DomainError'
import { CommunityId } from '../ValueObjects/CommunityId'

export class CommunityAlreadyHasForm extends DomainError {
  protected code = 'community-already-has-form'
  protected message

  constructor (communityId: CommunityId) {
    super()
    this.message = `A form for the community with id ${communityId} already exists`
  }
}
