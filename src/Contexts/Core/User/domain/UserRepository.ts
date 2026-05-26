import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { User } from './User'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Email } from './ValueObjects/Email'
import { PhoneNumber } from './ValueObjects/PhoneNumber'
import { Username } from './ValueObjects/Username'

export interface UserRepository {
    findByUsername(username: Username): Promise<Nullable<User>>
    findByEmail(email: Email): Promise<Nullable<User>>
    find (id: Id): Promise<Nullable<User>>
    search (criteria: Criteria): Promise<Array<User>>
    persist (user: User): Promise<void>
    findPhoneNumber(phoneNumber: PhoneNumber): Promise<Nullable<User>>
}