import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { InFilters } from '@Shared/domain/Criteria/InFilters'
import { ArrayContains, Equal, FindOperator, ILike, IsNull, LessThan, MoreThan, Not } from 'typeorm'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { InFilter } from '@Shared/domain/Criteria/InFilter'
import { Operator } from '@Shared/domain/Criteria/FilterOperator'
import { Operator as InOperator } from '@Shared/domain/Criteria/InFilterOperator'
import { OrderTypes } from '@Shared/domain/Criteria/OrderType'
import { Order } from '@Shared/domain/Criteria/Order'

type TypeOrmOptions = {
  order?: { [key: string]: string };
  where?: { [key: string]: string };
  take?: number;
  skip?: number;
}

type ColumnMapping = { [key: string]: string}

export class CriteriaToTypeOrmConverter {
  constructor (private readonly columnMapping: ColumnMapping = {}) {}

  convert (criteria: Criteria): TypeOrmOptions {
    const query: TypeOrmOptions = {}

    if (criteria.hasFilters()) query.where = this.buildWhereClauseForFilters(criteria.filters, criteria.inFilters)

    if (criteria.hasOrder()) {
      const orders = Order.asArray(criteria.order)

      for (const order of orders) {
        if (order.orderType.valueOf() !== OrderTypes.NONE) {
          if (!query.order) query.order = {}
          query.order[order.orderBy.valueOf()] = order.orderType.valueOf()
        }
      }
    }

    if (criteria.limit) query.take = criteria.limit
    if (criteria.offset) query.skip = criteria.offset

    return query
  }

  private buildWhereClauseForFilters (filters?: Filters, inFilters?: InFilters): TypeOrmOptions['where'] {
    const filtersOptions = (filters?.filters ?? []).reduce((acc, f) => {
      return { ...acc, [this.transformFieldName(f.field.valueOf())]: this.buildFindOperatorForFilter(f) }
    }, {})

    const inFiltersOptions = (inFilters?.filters ?? []).reduce((acc, f) => {
      return { ...acc, [this.transformFieldName(f.field.valueOf())]: this.buildFindOperatorForInFilter(f) }
    }, {})

    return { ...filtersOptions, ...inFiltersOptions }
  }

  private buildFindOperatorForFilter (filter: Filter): FindOperator<string | number | null> {
    switch (filter.operator.valueOf()) {
      case Operator.EQUAL:
        return filter.value ? Equal(filter.value.valueOf()) : IsNull()
      case Operator.NOT_EQUAL:
        return filter.value ? Not(Equal(filter.value.valueOf())) : Not(IsNull())
      case Operator.CONTAINS:
        return ILike(`%${filter.value?.valueOf() ?? null}%`)
      case Operator.NOT_CONTAINS:
        return Not(ILike(`%${filter.value?.valueOf() ?? null}%`))
      case Operator.GT:
        return MoreThan(filter.value?.valueOf() ?? 0)
      case Operator.LT:
        return LessThan(filter.value?.valueOf() ?? 0)
    }
  }

  private buildFindOperatorForInFilter (inFilter: InFilter): FindOperator<string | number> {
    const preparedValues = inFilter.values.map(v => v.valueOf())

    switch (inFilter.operator.valueOf()) {
      case InOperator.IN:
        return ArrayContains(preparedValues)
      case InOperator.NOT_IN:
        return Not(ArrayContains(preparedValues))
    }
  }

  private transformFieldName (field: string): string {
    const mappedValue = this.columnMapping[field]

    return mappedValue ?? field
  }
}
