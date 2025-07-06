import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { ProjectUser } from './ProjectUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ProjectUserRepository {
    find (id: Id): Promise<Nullable<ProjectUser>>
    search (criteria: Criteria): Promise<Array<ProjectUser>>
    persist (projectUser: ProjectUser): Promise<void>
    delete (projectUser: ProjectUser): Promise<void>
}
