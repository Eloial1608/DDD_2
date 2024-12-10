import { SlugValueObject } from '@Shared/domain/ValueObjects/SlugValueObject'
import { InvalidSlug } from '../Errors/InvalidSlug'

export class Slug extends SlugValueObject {
  protected throwErrorForInvalidValue (): void {
    throw new InvalidSlug(this)
  }
}
