import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { User } from './User'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Email } from './ValueObjects/Email'

export interface UserRepository {
    findByEmail(email: Email): Promise<Nullable<User>>
    find (id: Id): Promise<Nullable<User>>
    search (criteria: Criteria): Promise<Array<User>>
    persist (user: User): Promise<void>
}