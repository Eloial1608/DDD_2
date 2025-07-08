import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { DigitalStock } from './DigitalStock'
import type { Id } from './ValueObjects/Id'
import type { Nullable } from '@Shared/domain/Nullable'

export interface DigitalStockRepository {
  find(id: Id): Promise<Nullable<DigitalStock>>
  persist(stock: DigitalStock): Promise<void>
  search(criteria: Criteria): Promise<DigitalStock[]>
}
