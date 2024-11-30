import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'
import { AuthUserRepository } from '@Auth/AuthUser/domain/AuthUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { AuthUserSchema } from './entity/AuthUserSchema'
import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'
import { Method } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'

export class TypeOrmAuthUserRepository extends TypeOrmRepository<AuthUser> implements AuthUserRepository {
  protected get entitySchema (): EntitySchema {
    return AuthUserSchema
  }

  async find (id: Id): Promise<Nullable<AuthUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async findByCommunityMethodAndSecret (
    communityId: CommunityId,
    method: Method,
    secret: Secret
  ): Promise<Nullable<AuthUser>> {
    return await (await this.repository()).findOneBy(
      {
        communityId: Equal(communityId),
        method: Equal(method),
        secret: Equal(secret)
      }
    )
  }

  async search (criteria: Criteria): Promise<AuthUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (authuser: AuthUser): Promise<void> {
    await (await this.repository()).save(authuser)
  }
}
