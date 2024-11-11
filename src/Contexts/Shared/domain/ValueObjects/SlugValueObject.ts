import { StringValueObject } from './StringValueObject'

export abstract class SlugValueObject extends StringValueObject {
  private validSlug = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/

  constructor (value: string) {
    super(value)
    this.checkValueIsValid(value)
  }

  public checkValueIsValid (value: string): void {
    if (!this.validSlug.test(value)) {
      this.throwErrorForInvalidValue(value)
    }
  }

  protected abstract throwErrorForInvalidValue(value: string): void;
}
