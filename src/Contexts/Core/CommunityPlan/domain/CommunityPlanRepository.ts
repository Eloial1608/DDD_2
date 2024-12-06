import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { CommunityPlan } from './CommunityPlan'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface CommunityPlanRepository {
    find (id: Id): Promise<Nullable<CommunityPlan>>
    search (criteria: Criteria): Promise<Array<CommunityPlan>>
    persist (communityPlan: CommunityPlan): Promise<void>
}
