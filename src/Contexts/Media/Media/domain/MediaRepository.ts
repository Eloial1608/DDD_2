import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Media } from './Media'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface MediaRepository {
    find (id: Id): Promise<Nullable<Media>>
    search (criteria: Criteria): Promise<Array<Media>>
    persist (media: Media): Promise<void>
}
