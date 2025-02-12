import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { Section } from '@Course/Section/domain/Section'
import { SectionNotFound } from '@Course/Section/domain/Errors/SectionNotFound'

export class FinderById {
  constructor (private readonly repository: SectionRepository) {}

  async find (id: Id): Promise<Section> {
    const section = await this.repository.find(id)

    if (!section) throw new SectionNotFound(id)

    return section
  }
}
