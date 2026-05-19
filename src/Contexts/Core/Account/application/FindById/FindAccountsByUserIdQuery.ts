import { InFilterPrimitives } from '@Shared/domain/Criteria/InFilter'
import { CriteriaQuery } from '@Shared/domain/Criteria/CriteriaQuery'

export class FindAccountsByUserIdQuery extends CriteriaQuery {
  constructor (
    readonly userId: string,
    filters?: Array<Map<string, string | number | null>>,
    inFilters?: Array<InFilterPrimitives>,
    orderBy?: string,
    orderType?: string,
    limit?: number,
    offset?: number
  ) {
    const userIdFilter = new Map<string, string | number | null>([
      ['field', 'userId'],
      ['operator', '='],
      ['value', userId]
    ])
    const mergedFilters = filters ? [userIdFilter, ...filters] : [userIdFilter]
    super(mergedFilters, inFilters, orderBy, orderType, limit, offset)
  }
}
