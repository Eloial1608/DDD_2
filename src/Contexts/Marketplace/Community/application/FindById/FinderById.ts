import { CommunityRepository } from '@Marketplace/Community/domain/CommunityRepository'
import { Id } from '@Marketplace/Community/domain/ValueObjects/Id'
import { Community } from '@Marketplace/Community/domain/Community'
import { CommunityNotFound } from '@Marketplace/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const community = await this.repository.find(id)

    if (!community) throw new CommunityNotFound(id)

    return community
  }
}
