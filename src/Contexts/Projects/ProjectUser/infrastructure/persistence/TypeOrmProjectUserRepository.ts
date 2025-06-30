import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'
import { ProjectUserRepository } from '@Projects/ProjectUser/domain/ProjectUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { ProjectUserSchema } from './entity/ProjectUserSchema'
import { Id } from '@Projects/ProjectUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmProjectUserRepository extends TypeOrmRepository<ProjectUser> implements ProjectUserRepository {
  protected get entitySchema (): EntitySchema {
    return ProjectUserSchema
  }

  async find (id: Id): Promise<Nullable<ProjectUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<ProjectUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (projectUser: ProjectUser): Promise<void> {
    await (await this.repository()).save(projectUser)
  }
}
