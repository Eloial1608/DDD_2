import { MediaUserRepository } from '@Media/MediaUser/domain/MediaUserRepository'
import { MediaUser } from '@Media/MediaUser/domain/MediaUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: MediaUserRepository) {}

  async find (criteria: Criteria): Promise<Array<MediaUser>> {
    return await this.repository.search(criteria)
  }
}
