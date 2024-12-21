import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { PlanForUsers } from './PlanForUsers'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface PlanForUsersRepository {
    find (id: Id): Promise<Nullable<PlanForUsers>>
    search (criteria: Criteria): Promise<Array<PlanForUsers>>
    persist (planFOrUsers: PlanForUsers): Promise<void>
}
