import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { SpaceMember } from './SpaceMember'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface SpaceMemberRepository {
    find (id: Id): Promise<Nullable<SpaceMember>>
    search (criteria: Criteria): Promise<Array<SpaceMember>>
    persist (spaceMember: SpaceMember): Promise<void>
}
