import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { InFilterPrimitives } from '@Shared/domain/Criteria/InFilter'

type Criteria = ReturnType<typeof buildCriteriaFromUri>
type Filters = Array<Map<string, string | number | null>>

export function combineCriterias (baseCriteria: Criteria, other: Criteria): Criteria {
  return {
    filters: combineFilters(baseCriteria.filters, other.filters),
    inFilters: combineInFilters(baseCriteria.inFilters, other.inFilters),
    orderBy: other.orderBy ?? baseCriteria.orderBy,
    orderType: other.orderType ?? baseCriteria.orderType,
    limit: other.limit ?? baseCriteria.limit,
    offset: other.offset ?? baseCriteria.offset
  }
}

function combineFilters (baseFilters: Filters = [], other: Filters = []): Filters {
  const otherFields = other.map(f => f.get('field')! as string)
  const updatedBaseFilters = baseFilters.filter(f => !otherFields.includes(f.get('field')! as string))

  return updatedBaseFilters.concat(other)
}

function combineInFilters (baseInFilters: InFilterPrimitives[] = [], other: InFilterPrimitives[] = []): InFilterPrimitives[] {
  const otherFields = other.map(f => f.field)
  const updatedBaseInFilters = baseInFilters.filter(f => !otherFields.includes(f.field))

  return updatedBaseInFilters.concat(other)
}
