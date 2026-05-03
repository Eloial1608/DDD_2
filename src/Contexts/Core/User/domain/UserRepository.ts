import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { User } from './User'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface UserRepository {
    find (id: Id): Promise<Nullable<User>>
    search (criteria: Criteria): Promise<Array<User>>
    persist (user: User): Promise<void>
}