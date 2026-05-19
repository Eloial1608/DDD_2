import { User } from '@Core/User/domain/User'
import { UserRepository } from '@Core/User/domain/UserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { UserSchema } from './entity/UserSchema'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Email } from '@Core/User/domain/ValueObjects/Email'

export class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
  protected get entitySchema (): EntitySchema {
    return UserSchema
  }

  async find (id: Id): Promise<Nullable<User>> {
    return await (await this.repository()).findOneBy({
      id: Equal(id.valueOf())
    })
  }

  async findByEmail (email: Email): Promise<Nullable<User>> {
    return await (await this.repository()).findOneBy({
      email: Equal(email)
    })
  }

  async search (criteria: Criteria): Promise<User[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (user: User): Promise<void> {
    await (await this.repository()).save(user)
  }
}