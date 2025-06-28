import { Project } from '@Projects/Project/domain/Project'
import { ProjectRepository } from '@Projects/Project/domain/ProjectRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { ProjectSchema } from './entity/ProjectSchema'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmProjectRepository extends TypeOrmRepository<Project> implements ProjectRepository {
  protected get entitySchema (): EntitySchema {
    return ProjectSchema
  }

  async find (id: Id): Promise<Nullable<Project>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Project[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (project: Project): Promise<void> {
    await (await this.repository()).save(project)
  }

  async delete (project: Project): Promise<void> {
    await (await this.repository()).remove(project)
  }
}
