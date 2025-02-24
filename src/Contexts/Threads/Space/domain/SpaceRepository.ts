import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Space } from './Space'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface SpaceRepository {
    find (id: Id): Promise<Nullable<Space>>
    search (criteria: Criteria): Promise<Array<Space>>
    persist (space: Space): Promise<void>
    delete (space: Space): Promise<void>
}
