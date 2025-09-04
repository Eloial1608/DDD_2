import { NewUser } from '@Metrics/NewUser/domain/NewUser'
import { NewUserRepository } from '@Metrics/NewUser/domain/NewUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { NewUserSchema } from './entity/NewUserSchema'
import { Id } from '@Metrics/NewUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmNewUserRepository extends TypeOrmRepository<NewUser> implements NewUserRepository {
  protected get entitySchema (): EntitySchema {
    return NewUserSchema
  }

  async find (id: Id): Promise<Nullable<NewUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<NewUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (newuser: NewUser): Promise<void> {
    await (await this.repository()).save(newuser)
  }
}
