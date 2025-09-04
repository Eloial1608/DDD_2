import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { UniqueDailyLogin } from './UniqueDailyLogin'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface UniqueDailyLoginRepository {
    find (id: Id): Promise<Nullable<UniqueDailyLogin>>
    search (criteria: Criteria): Promise<Array<UniqueDailyLogin>>
    persist (uniquedailylogin: UniqueDailyLogin): Promise<void>
}
