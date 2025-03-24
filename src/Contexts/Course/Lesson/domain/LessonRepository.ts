import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Lesson } from './Lesson'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface LessonRepository {
    find (id: Id): Promise<Nullable<Lesson>>
    search (criteria: Criteria): Promise<Array<Lesson>>
    persist (lesson: Lesson): Promise<void>
}
