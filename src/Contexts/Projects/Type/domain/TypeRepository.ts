import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Type } from './Type'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface TypeRepository {
    find (id: Id): Promise<Nullable<Type>>
    search (criteria: Criteria): Promise<Array<Type>>
    persist (type: Type): Promise<void>
    delete (type: Type): Promise<void>
}
