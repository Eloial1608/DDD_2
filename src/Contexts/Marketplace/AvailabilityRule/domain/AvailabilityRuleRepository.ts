import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { AvailabilityRule } from './AvailabilityRule'
import type { AvailabilityRuleId } from './ValueObjects/AvailabilityRuleId'
import type { Nullable } from '@Shared/domain/Nullable'

export interface AvailabilityRuleRepository {
  find(id: AvailabilityRuleId): Promise<Nullable<AvailabilityRule>>
  persist(rule: AvailabilityRule): Promise<void>
  search(criteria: Criteria): Promise<AvailabilityRule[]>
  delete(rule: AvailabilityRule): Promise<void>
}
