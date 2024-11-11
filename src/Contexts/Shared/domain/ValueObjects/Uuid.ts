import { v4 } from 'uuid'
import validate from 'uuid-validate'
import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'
import { InvalidArgumentError } from './InvalidArgumentError'

export class Uuid extends ValueObject<string> {
  constructor (value: string) {
    super(value)

    this.ensureIsValidUuid(value)
  }

  static random (): Uuid {
    return new Uuid(v4())
  }

  private ensureIsValidUuid (id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }
}
