import { MediaUser } from '@Media/MediaUser/domain/MediaUser'
import { MediaUserRepository } from '@Media/MediaUser/domain/MediaUserRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { MediaUserSchema } from './entity/MediaUserSchema'
import { Id } from '@Media/MediaUser/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmMediaUserRepository extends TypeOrmRepository<MediaUser> implements MediaUserRepository {
  protected get entitySchema (): EntitySchema {
    return MediaUserSchema
  }

  async find (id: Id): Promise<Nullable<MediaUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<MediaUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (mediaUser: MediaUser): Promise<void> {
    await (await this.repository()).save(mediaUser)
  }
}
