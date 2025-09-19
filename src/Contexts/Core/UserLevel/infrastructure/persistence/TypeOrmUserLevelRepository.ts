import { UserLevel } from '../../domain/UserLevel'
import { UserLevelRepository } from '../../domain/UserLevelRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { UserLevelSchema } from './entity/UserLevelSchema'
import { Id } from '../../domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmUserLevelRepository extends TypeOrmRepository<UserLevel> implements UserLevelRepository {
  protected get entitySchema (): EntitySchema {
    return UserLevelSchema
  }

  async find (id: Id): Promise<Nullable<UserLevel>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<UserLevel[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (userLevel: UserLevel): Promise<void> {
    await (await this.repository()).save(userLevel)
  }

  async delete (userLevel: UserLevel): Promise<void> {
    await (await this.repository()).remove(userLevel)
  }
}
