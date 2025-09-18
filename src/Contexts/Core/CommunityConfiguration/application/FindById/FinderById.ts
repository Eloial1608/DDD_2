import { CommunityConfigurationRepository } from '@Core/CommunityConfiguration/domain/CommunityConfigurationRepository'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { CommunityConfiguration } from '@Core/CommunityConfiguration/domain/CommunityConfiguration'
import { CommunityConfigurationNotFound } from '@Core/CommunityConfiguration/domain/Errors/CommunityConfigurationNotFound'

export class FinderById {
  constructor (private readonly repository: CommunityConfigurationRepository) {}

  async find (id: Id): Promise<CommunityConfiguration> {
    const communityconfiguration = await this.repository.find(id)

    if (!communityconfiguration) throw new CommunityConfigurationNotFound(id)

    return communityconfiguration
  }
}
