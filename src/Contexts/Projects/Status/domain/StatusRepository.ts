import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Status } from './Status'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface StatusRepository {
    find (id: Id): Promise<Nullable<Status>>
    search (criteria: Criteria): Promise<Array<Status>>
    persist (status: Status): Promise<void>
    delete (status: Status): Promise<void>
}
