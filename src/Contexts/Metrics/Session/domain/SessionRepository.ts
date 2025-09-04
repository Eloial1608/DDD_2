import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Session } from './Session'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface SessionRepository {
    find (id: Id): Promise<Nullable<Session>>
    search (criteria: Criteria): Promise<Array<Session>>
    persist (session: Session): Promise<void>
}
