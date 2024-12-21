import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { UserPlan } from './UserPlan'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface UserPlanRepository {
    find (id: Id): Promise<Nullable<UserPlan>>
    search (criteria: Criteria): Promise<Array<UserPlan>>
    persist (userPlan: UserPlan): Promise<void>
}