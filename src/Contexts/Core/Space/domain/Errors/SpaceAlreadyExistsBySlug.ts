import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Slug } from '../ValueObjects/Slug'

export class SpaceAlreadyExistsBySlug extends DomainError {
  protected code = 'space-already-exists'
  protected message

  constructor (slug: Slug) {
    super()
    this.message = `A space with slug ${slug} already exists`
  }
}
