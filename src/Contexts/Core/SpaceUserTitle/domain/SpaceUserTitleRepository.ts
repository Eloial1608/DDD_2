import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { SpaceUserTitle } from './SpaceUserTitle'

export interface SpaceUserTitleRepository {
    find (id: Id): Promise<Nullable<SpaceUserTitle>>
    search (criteria: Criteria): Promise<Array<SpaceUserTitle>>
    persist (space: SpaceUserTitle): Promise<void>
    delete (space: SpaceUserTitle): Promise<void>
}
