import { LikeRepository } from '@Posts/Like/domain/LikeRepository'
import { Id } from '@Posts/Like/domain/ValueObjects/Id'
import { Like } from '@Posts/Like/domain/Like'
import { LikeNotFound } from '@Posts/Like/domain/Errors/LikeNotFound'

export class FinderById {
  constructor (private readonly repository: LikeRepository) {}

  async find (id: Id): Promise<Like> {
    const like = await this.repository.find(id)

    if (!like) throw new LikeNotFound(id)

    return like
  }
}
