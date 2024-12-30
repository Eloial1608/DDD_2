import { CommunityRepository } from '@Posts/Community/domain/CommunityRepository'
import { Id } from '@Posts/Community/domain/ValueObjects/Id'
import { Community } from '@Posts/Community/domain/Community'
import { CommunityNotFound } from '@Posts/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
