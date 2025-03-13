import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { CourseUser } from './CourseUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface CourseUserRepository {
    find (id: Id): Promise<Nullable<CourseUser>>
    search (criteria: Criteria): Promise<Array<CourseUser>>
    persist (postUser: CourseUser): Promise<void>
}
