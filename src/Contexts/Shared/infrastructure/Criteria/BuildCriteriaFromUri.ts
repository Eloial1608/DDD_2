import { InFilterPrimitives } from '@Shared/domain/Criteria/InFilter'
import { InvalidArgumentError } from '@Shared/domain/ValueObjects/InvalidArgumentError'
import { CriteriaFilter } from '@Shared/infrastructure/Criteria/CriteriaFilter'

type Criteria = {
  filters?: Array<Map<string, string | number | null>>,
  inFilters?: Array<InFilterPrimitives>,
  orderBy?: string,
  orderType?: string,
  limit?: number,
  offset?: number
}

export function buildCriteriaFromUri (criteriaParam: string | undefined, limit: number = 15, offset: number = 0): Criteria {
  try {
    const defaultCriteria = { limit, offset }
    const decodedCriteria = criteriaParam
      ? { ...defaultCriteria, ...decodeCriteria(criteriaParam) }
      : defaultCriteria

    const filters = decodedCriteria.filters?.map((f: CriteriaFilter) => new Map(Object.entries(f))) ?? []

    return { ...decodedCriteria, filters }
  } catch (e) {
    throw new InvalidArgumentError('Invalid JSON query params')
  }
}

function decodeCriteria (criteriaParam: string) {
  const decodedCriteria = decodeURI(criteriaParam)
  return JSON.parse(decodedCriteria)
}
