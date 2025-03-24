import { CommunityRepository } from '@Threads/Community/domain/CommunityRepository'
import { Id } from '@Threads/Community/domain/ValueObjects/Id'
import { Community } from '@Threads/Community/domain/Community'
import { CommunityNotFound } from '@Threads/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
