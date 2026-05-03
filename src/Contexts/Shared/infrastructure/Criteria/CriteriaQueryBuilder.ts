import { CriteriaQuery } from '@Shared/domain/Criteria/CriteriaQuery'
import { buildCriteriaFromUri } from './BuildCriteriaFromUri'

export function criteriaQueryBuilder<T extends CriteriaQuery> (Builder: {new(...args: any): T}, criteriaParam?: string): T {
  const DEFAULT_LIMIT = 15
  const DEFAULT_OFFSET = 0

  const criteria = buildCriteriaFromUri(criteriaParam, DEFAULT_LIMIT, DEFAULT_OFFSET)

  return new Builder(criteria.filters, criteria.inFilters, criteria.orderBy, criteria.orderType, criteria.limit, criteria.offset)
}
