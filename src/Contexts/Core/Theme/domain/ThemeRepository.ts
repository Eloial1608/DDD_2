import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Theme } from './Theme'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ThemeRepository{
        find (id: Id): Promise<Nullable<Theme>>
        search (criteria: Criteria): Promise<Array<Theme>>
        persist (theme: Theme): Promise<void>
}
