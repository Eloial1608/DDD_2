import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Course } from './Course'
import { Id } from './ValueObjects/Id'

export interface CourseRepository {
    find (id: Id): Promise<Nullable<Course>>
    search (criteria: Criteria): Promise<Array<Course>>
    persist (course: Course): Promise<void>
}
