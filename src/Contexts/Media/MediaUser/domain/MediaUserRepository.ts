import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { MediaUser } from './MediaUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface MediaUserRepository {
    find (id: Id): Promise<Nullable<MediaUser>>
    search (criteria: Criteria): Promise<Array<MediaUser>>
    persist (mediaUser: MediaUser): Promise<void>
}
