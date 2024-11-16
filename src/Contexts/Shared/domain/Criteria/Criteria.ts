import { Filters } from './Filters'
import { Order } from './Order'
import { InFilters } from '@Shared/domain/Criteria/InFilters'
import { InFilterPrimitives } from '@Shared/domain/Criteria/InFilter'

export class Criteria {
  readonly filters?: Filters
  readonly inFilters?: InFilters
  readonly order: Order | Order[]
  readonly limit?: number
  readonly offset?: number

  constructor (filters?: Filters, inFilters?: InFilters, order?: Order | Order[], limit?: number, offset?: number) {
    this.filters = filters
    this.inFilters = inFilters
    this.order = order ?? []
    this.limit = limit
    this.offset = offset
  }

  public hasFilters (): boolean {
    const filterCount = this.filters?.filters.length ?? 0
    const inFilterCount = this.inFilters?.filters.length ?? 0

    return filterCount + inFilterCount > 0
  }

  hasOrder (): boolean {
    if (Array.isArray(this.order)) return this.order.length > 0

    return this.order.hasOrder()
  }

  static fromPrimitives (filters?: Array<Map<string, string | number | null>>, inFilters?: Array<InFilterPrimitives>, orderBy?: string | string[], orderType?: string | string[], limit?: number, offset?: number): Criteria {
    return new Criteria(
      filters ? Filters.fromValues(filters) : undefined,
      inFilters ? InFilters.fromPrimitives(inFilters) : undefined,
      Order.fromValues(orderBy, orderType),
      limit,
      offset
    )
  }
}
