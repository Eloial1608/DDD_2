import { Status } from '@Projects/Status/domain/Status'
import { StatusRepository } from '@Projects/Status/domain/StatusRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { StatusSchema } from './entity/StatusSchema'
import { Id } from '@Projects/Status/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmStatusRepository extends TypeOrmRepository<Status> implements StatusRepository {
  protected get entitySchema (): EntitySchema {
    return StatusSchema
  }

  async find (id: Id): Promise<Nullable<Status>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Status[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (status: Status): Promise<void> {
    await (await this.repository()).save(status)
  }

  async delete (status: Status): Promise<void> {
    await (await this.repository()).remove(status)
  }
}
