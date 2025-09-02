import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { NewUser } from './NewUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface NewUserRepository {
    find (id: Id): Promise<Nullable<NewUser>>
    search (criteria: Criteria): Promise<Array<NewUser>>
    persist (newuser: NewUser): Promise<void>
}