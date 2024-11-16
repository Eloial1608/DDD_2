import { CriteriaQuery } from '@Shared/domain/Criteria/CriteriaQuery'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export abstract class CriteriaHandler {
  protected buildCriteria (query: CriteriaQuery): Criteria {
    const { filters, inFilters, orderBy, orderType, limit, offset } = query
    return Criteria.fromPrimitives(filters, inFilters, orderBy, orderType, limit, offset)
  }
}
