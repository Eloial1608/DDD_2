import { Nullable } from '@Shared/domain/Nullable'
import { CardMovement } from './CardMovement'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { CardMovementId } from './ValueObjects/CardMovementId'

export interface CardMovementRepository {
    find (id: CardMovementId): Promise<Nullable<CardMovement>>
    search (criteria: Criteria): Promise<Array<CardMovement>>
    persist (CardMovement: CardMovement): Promise<void>
}