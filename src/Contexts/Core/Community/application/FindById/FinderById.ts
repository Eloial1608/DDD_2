import { CommunityRepository } from '@Core/Community/domain/CommunityRepository'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Community } from '@Core/Community/domain/Community'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityRepository) {}

  async find (id: Id): Promise<Community> {
    const guide = await this.repository.find(id)

    if (!guide) throw new CommunityNotFound(id)

    return guide
  }
}
