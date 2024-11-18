import { Command } from '../CommandBus/Command'
import { InFilterPrimitives } from '@Shared/domain/Criteria/InFilter'

export abstract class CriteriaCommand implements Command {
  readonly filters?: Array<Map<string, string | number | null>>
  readonly inFilters?: Array<InFilterPrimitives>
  readonly orderBy?: string
  readonly orderType?: string
  readonly limit?: number
  readonly offset?: number

  constructor (
    filters?: Array<Map<string, string | number | null>>,
    inFilters?: Array<InFilterPrimitives>,
    orderBy?: string,
    orderType?: string,
    limit?: number,
    offset?: number
  ) {
    this.filters = filters
    this.inFilters = inFilters
    this.orderBy = orderBy
    this.orderType = orderType
    this.limit = limit
    this.offset = offset
  }
}
