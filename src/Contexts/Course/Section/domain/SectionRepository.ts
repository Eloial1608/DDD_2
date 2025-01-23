import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Section } from './Section'
import { Id } from './ValueObjects/Id'

export interface SectionRepository {
    find (id: Id): Promise<Nullable<Section>>
    search (criteria: Criteria): Promise<Array<Section>>
    persist (section: Section): Promise<void>
}
