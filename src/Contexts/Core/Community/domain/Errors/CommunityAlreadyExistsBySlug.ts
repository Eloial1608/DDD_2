import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Slug } from '../ValueObjects/Slug'

export class CommunityAlreadyExistsBySlug extends DomainError {
  protected code = 'community-already-exists'
  protected message

  constructor (slug: Slug) {
    super()
    this.message = `A community with slug ${slug} already exists`
  }
}
