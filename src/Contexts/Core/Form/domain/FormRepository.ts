import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Form } from './Form'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface FormRepository {
    find (id: Id): Promise<Nullable<Form>>
    search (criteria: Criteria): Promise<Array<Form>>
    persist (form: Form): Promise<void>
}
