import { LikeRepository } from '@Threads/Like/domain/LikeRepository'
import { Id } from '@Threads/Like/domain/ValueObjects/Id'
import { Like } from '@Threads/Like/domain/Like'
import { LikeNotFound } from '@Threads/Like/domain/Errors/LikeNotFound'

export class FinderById {
  constructor (private readonly repository: LikeRepository) {}

  async find (id: Id): Promise<Like> {
    const like = await this.repository.find(id)

    if (!like) throw new LikeNotFound(id)

    return like
  }
}
