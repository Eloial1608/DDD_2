import { CommunityRepository } from '@Projects/Community/domain/CommunityRepository'
import { Id } from '@Projects/Community/domain/ValueObjects/Id'
import { Community } from '@Projects/Community/domain/Community'
import { CommunityNotFound } from '@Projects/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
