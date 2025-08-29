import { TitleRepository } from '@Core/Title/domain/TitleRepository'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { Title } from '@Core/Title/domain/Title'
import { TitleNotFound } from '@Core/Title/domain/Errors/TitleNotFound'

export class FinderById {
  constructor (private readonly repository: TitleRepository) {}

  async find (id: Id): Promise<Title> {
    const space = await this.repository.find(id)

    if (!space) throw new TitleNotFound(id)

    return space
  }
}
