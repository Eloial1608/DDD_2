import { Media } from '@Media/Media/domain/Media'
import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Mediachema } from './entity/MediaSchema'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmMediaRepository extends TypeOrmRepository<Media> implements MediaRepository {
  protected get entitySchema (): EntitySchema {
    return Mediachema
  }

  async find (id: Id): Promise<Nullable<Media>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Media[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (media: Media): Promise<void> {
    await (await this.repository()).save(media)
  }
}
