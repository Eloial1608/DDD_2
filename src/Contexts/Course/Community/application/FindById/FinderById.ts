import { CommunityRepository } from '@Course/Community/domain/CommunityRepository'
import { Id } from '@Course/Community/domain/ValueObjects/Id'
import { Community } from '@Course/Community/domain/Community'
import { CommunityNotFound } from '@Course/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
