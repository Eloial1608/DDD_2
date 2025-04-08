import { CommunityRepository } from '@Chat/Community/domain/CommunityRepository'
import { Id } from '@Chat/Community/domain/ValueObjects/Id'
import { Community } from '@Chat/Community/domain/Community'
import { CommunityNotFound } from '@Chat/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
