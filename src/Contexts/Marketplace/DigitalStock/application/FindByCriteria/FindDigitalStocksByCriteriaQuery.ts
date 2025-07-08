import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { Query } from '@Shared/domain/QueryBus/Query'

export class FindDigitalStocksByCriteriaQuery implements Query {
  constructor (readonly criteria: Criteria) {}
}
