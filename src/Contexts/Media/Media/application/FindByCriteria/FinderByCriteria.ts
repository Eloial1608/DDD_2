import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { Media } from '@Media/Media/domain/Media'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: MediaRepository) {}

  async find (criteria: Criteria): Promise<Array<Media>> {
    return await this.repository.search(criteria)
  }
}
