import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { UserTitle } from './UserTitle'

export interface UserTitleRepository {
    find (id: Id): Promise<Nullable<UserTitle>>
    search (criteria: Criteria): Promise<Array<UserTitle>>
    persist (userTitle: UserTitle): Promise<void>
}
