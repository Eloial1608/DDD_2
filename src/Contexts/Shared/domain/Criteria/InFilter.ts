import { FilterField } from '@Shared/domain/Criteria/FilterField'
import { InFilterOperator } from '@Shared/domain/Criteria/InFilterOperator'
import { FilterValue } from '@Shared/domain/Criteria/FilterValue'

export interface InFilterPrimitives {
  field: string
  operator: string
  values: string[]
}

export class InFilter {
  constructor (
    readonly field: FilterField,
    readonly operator: InFilterOperator,
    readonly values: FilterValue[]) {
  }

  static fromPrimitives (primitives: InFilterPrimitives): InFilter {
    return new InFilter(
      new FilterField(primitives.field),
      InFilterOperator.fromValue(primitives.operator),
      primitives.values.map(v => new FilterValue(v))
    )
  }
}
