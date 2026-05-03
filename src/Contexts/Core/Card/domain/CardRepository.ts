import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Card } from '@Core/Card/domain/Card'

export interface CardRepository {
    find (id: Id): Promise<Nullable<Card>>
    search (criteria: Criteria): Promise<Array<Card>>
    persist (Card: Card): Promise<void>
}