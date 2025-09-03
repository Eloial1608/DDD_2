import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { UserRetention } from './UserRetention'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface UserRetentionRepository {
    find (id: Id): Promise<Nullable<UserRetention>>
    search (criteria: Criteria): Promise<Array<UserRetention>>
    persist (userretention: UserRetention): Promise<void>
}
