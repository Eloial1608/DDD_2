import { CommunityRepository } from 'src/Contexts/Threads/Community/domain/CommunityRepository'
import { Id } from 'src/Contexts/Threads/Community/domain/ValueObjects/Id'
import { Community } from 'src/Contexts/Threads/Community/domain/Community'
import { CommunityNotFound } from 'src/Contexts/Threads/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
