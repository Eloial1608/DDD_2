import { CommunityRepository } from '@Media/Community/domain/CommunityRepository'
import { Id } from '@Media/Community/domain/ValueObjects/Id'
import { Community } from '@Media/Community/domain/Community'
import { CommunityNotFound } from '@Media/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
