import type { Nullable } from '@Shared/domain/Nullable'
import type { Id } from './ValueObjects/Id'
import type { Action } from './Action'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ActionRepository {
    find (id: Id): Promise<Nullable<Action>>
    search (criteria: Criteria): Promise<Array<Action>>
    persist (action: Action): Promise<void>
    delete (action: Action): Promise<void>
}
