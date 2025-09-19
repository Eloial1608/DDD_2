import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { UserLevel } from './UserLevel'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface UserLevelRepository {
    find (id: Id): Promise<Nullable<UserLevel>>
    search (criteria: Criteria): Promise<Array<UserLevel>>
    persist (userLevel: UserLevel): Promise<void>
    delete (userLevel: UserLevel): Promise<void>
}
