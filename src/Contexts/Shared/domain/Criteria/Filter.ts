import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'
import { FilterField } from './FilterField'
import { FilterOperator } from './FilterOperator'
import { FilterValue } from './FilterValue'
import { Nullable } from '../Nullable'

export class Filter {
  readonly field: FilterField
  readonly operator: FilterOperator
  readonly value: Nullable<FilterValue>

  constructor (field: FilterField, operator: FilterOperator, value: Nullable<FilterValue>) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  static fromValues (values: Map<string, string | number | null>): Filter {
    const field = values.get('field') as string | undefined
    const operator = values.get('operator') as string | undefined
    const value = values.get('value')

    if (!field || !operator) {
      throw new InvalidArgumentError('The filter is invalid')
    }

    return new Filter(new FilterField(field), FilterOperator.fromValue(operator), value != null ? new FilterValue(value) : null)
  }

  static simple (field: string, operator: string, value: string | number | null): Filter {
    const filter = new Map<string, string | number | null>([
      ['field', field],
      ['operator', operator],
      ['value', value]
    ])
    return Filter.fromValues(filter)
  }
}
