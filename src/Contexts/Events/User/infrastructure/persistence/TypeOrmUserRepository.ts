import { User } from '@Events/User/domain/User'
import { UserRepository } from '@Events/User/domain/UserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { UserSchema } from './entity/UserSchema'
import { Id } from '@Events/User/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
  protected get entitySchema (): EntitySchema {
    return UserSchema
  }

  async find (id: Id): Promise<Nullable<User>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<User[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (user: User): Promise<void> {
    await (await this.repository()).save(user)
  }

  async delete (user: User): Promise<void> {
    await (await this.repository()).remove(user)
  }
}
