import { LikeRepository } from '@Media/Like/domain/LikeRepository'
import { Id } from '@Media/Like/domain/ValueObjects/Id'
import { Like } from '@Media/Like/domain/Like'
import { LikeNotFound } from '@Media/Like/domain/Errors/LikeNotFound'

export class FinderById {
  constructor (private readonly repository: LikeRepository) {}

  async find (id: Id): Promise<Like> {
    const like = await this.repository.find(id)

    if (!like) throw new LikeNotFound(id)

    return like
  }
}
