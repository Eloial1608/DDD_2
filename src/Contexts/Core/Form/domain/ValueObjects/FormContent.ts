import { Nullable } from '@Shared/domain/Nullable'
import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'

type Primitive = {
    id: string,
    label: string,
    type: string,
    placeholder: string,
    required: boolean
    values: Nullable<{name: string, value: string}>
}

export class FormContent {
  constructor (
    readonly id: string,
    readonly label: string,
    readonly type: string,
    readonly placeholder: string,
    readonly required: boolean,
    readonly values: Nullable<{name: string, value: string}>
  ) {}
}

export class FormContents extends ValueObject<FormContent[]> {
  toPrimitives (): Primitive[] {
    return this.valueOf().map(x => ({
      id: x.id,
      label: x.label,
      type: x.type,
      placeholder: x.placeholder,
      required: x.required,
      values: x.values
    }))
  }

  static fromPrimitives (primitives: Primitive[]): FormContents {
    return new FormContents(
      primitives.map(
        x => new FormContent(
          x.id,
          x.label,
          x.type,
          x.placeholder,
          x.required,
          x.values
        ))
    )
  }
}
