import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Plan } from './Plan'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface PlanRepository {
    find (id: Id): Promise<Nullable<Plan>>
    search (criteria: Criteria): Promise<Array<Plan>>
    persist (plan: Plan): Promise<void>
}
