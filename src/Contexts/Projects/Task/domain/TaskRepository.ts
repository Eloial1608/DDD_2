import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Task } from './Task'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface TaskRepository {
    find (id: Id): Promise<Nullable<Task>>
    search (criteria: Criteria): Promise<Array<Task>>
    persist (task: Task): Promise<void>
    delete (task: Task): Promise<void>
}
