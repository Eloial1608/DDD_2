import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { CreatedEntity } from './CreatedEntity'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface CreatedEntityRepository {
    find (id: Id): Promise<Nullable<CreatedEntity>>
    search (criteria: Criteria): Promise<Array<CreatedEntity>>
    persist (createdentity: CreatedEntity): Promise<void>
}