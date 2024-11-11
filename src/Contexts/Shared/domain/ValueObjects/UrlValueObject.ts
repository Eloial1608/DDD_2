import { StringValueObject } from '@Shared/domain/ValueObjects/StringValueObject'
import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'

export abstract class UrlValueObject extends StringValueObject {
  constructor (value: string) {
    super(value)
    this.ensureIsValidUrl(value)
  }

  private ensureIsValidUrl (url: string) {
    try {
      // eslint-disable-next-line no-new
      new URL(url)
    } catch (_) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${url}>`)
    }
  }
}
