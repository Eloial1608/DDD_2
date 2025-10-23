import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Project } from './Project'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ProjectRepository {
    find (id: Id): Promise<Nullable<Project>>
    search (criteria: Criteria): Promise<Array<Project>>
    persist (project: Project): Promise<void>
    delete (project: Project): Promise<void>
}
