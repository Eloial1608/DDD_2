import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { AvailabilityException } from './AvailabilityException'
import type { AvailabilityExceptionId } from './ValueObjects/AvailabilityExceptionId'
import type { Nullable } from '@Shared/domain/Nullable'

export interface AvailabilityExceptionRepository {
  find(id: AvailabilityExceptionId): Promise<Nullable<AvailabilityException>>
  persist(exception: AvailabilityException): Promise<void>
  search(criteria: Criteria): Promise<AvailabilityException[]>
  delete(exception: AvailabilityException): Promise<void>
}
