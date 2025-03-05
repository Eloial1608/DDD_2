import { ContentRepository } from '@Media/Content/domain/ContentRepository'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { Content } from '@Media/Content/domain/Content'
import { ContentNotFound } from '@Media/Content/domain/Errors/ContentNotFound'

export class FinderById {
  constructor (private readonly repository: ContentRepository) {}

  async find (id: Id): Promise<Content> {
    const content = await this.repository.find(id)

    if (!content) throw new ContentNotFound(id)

    return content
  }
}
