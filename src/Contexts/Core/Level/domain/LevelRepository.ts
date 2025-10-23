import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Level } from './Level'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface LevelRepository {
    find (id: Id): Promise<Nullable<Level>>
    search (criteria: Criteria): Promise<Array<Level>>
    persist (level: Level): Promise<void>
    delete (level: Level): Promise<void>
}
