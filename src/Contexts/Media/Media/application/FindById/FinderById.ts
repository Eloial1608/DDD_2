import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { Media } from '@Media/Media/domain/Media'
import { MediaNotFound } from '@Media/Media/domain/Errors/MediaNotFound'

export class FinderById {
  constructor (private readonly repository: MediaRepository) {}

  async find (id: Id): Promise<Media> {
    const media = await this.repository.find(id)

    if (!media) throw new MediaNotFound(id)

    return media
  }
}
