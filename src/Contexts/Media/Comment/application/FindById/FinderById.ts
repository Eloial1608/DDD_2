import { CommentRepository } from '@Media/Comment/domain/CommentRepository'
import { Id } from '@Media/Comment/domain/ValueObjects/Id'
import { Comment } from '@Media/Comment/domain/Comment'
import { CommentNotFound } from '@Media/Comment/domain/Errors/CommentNotFound'

export class FinderById {
  constructor (private readonly repository: CommentRepository) {}

  async find (id: Id): Promise<Comment> {
    const comment = await this.repository.find(id)

    if (!comment) throw new CommentNotFound(id)

    return comment
  }
}
