import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { UserTitleSchema } from './entity/UserTitleSchema'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { UserTitle } from '@Core/UserTitle/domain/UserTitle'
import { UserTitleRepository } from '@Core/UserTitle/domain/UserTitleRepository'

export class TypeOrmUserTitleRepository extends TypeOrmRepository<UserTitle> implements UserTitleRepository {
  protected get entitySchema (): EntitySchema {
    return UserTitleSchema
  }

  async find (id: Id): Promise<Nullable<UserTitle>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<UserTitle[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (UserTitle: UserTitle): Promise<void> {
    await (await this.repository()).save(UserTitle)
  }

  async delete (UserTitle: UserTitle): Promise<void> {
    await (await this.repository()).remove(UserTitle)
  }
}
