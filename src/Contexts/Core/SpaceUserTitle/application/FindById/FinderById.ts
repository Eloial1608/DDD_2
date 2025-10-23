import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
import { Id } from '@Core/SpaceUserTitle/domain/ValueObjects/Id'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'
import { SpaceUserTitleNotFound } from '@Core/SpaceUserTitle/domain/Errors/SpaceUserTitleNotFound'

export class FinderById {
  constructor (private readonly repository: SpaceUserTitleRepository) {}

  async find (id: Id): Promise<SpaceUserTitle> {
    const spaceUserTitle = await this.repository.find(id)

    if (!spaceUserTitle) throw new SpaceUserTitleNotFound(id)

    return spaceUserTitle
  }
}
