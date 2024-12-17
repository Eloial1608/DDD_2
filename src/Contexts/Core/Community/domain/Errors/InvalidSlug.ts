import { DomainError } from '@Shared/domain/Errors/DomainError'
import { Slug } from '../ValueObjects/Slug'

export class InvalidSlug extends DomainError {
  protected code = 'invalid-slug'
  protected message

  constructor (slug: Slug) {
    super()
    this.message = `The community slug ${slug.valueOf()} isn't valid`
  }
}
