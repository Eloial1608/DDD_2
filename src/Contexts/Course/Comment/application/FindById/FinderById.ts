import { CommentRepository } from '@Course/Comment/domain/CommentRepository'
import { Id } from '@Course/Comment/domain/ValueObjects/Id'
import { Comment } from '@Course/Comment/domain/Comment'
import { CommentNotFound } from '@Course/Comment/domain/Errors/CommentNotFound'

export class FinderById {
  constructor (private readonly repository: CommentRepository) {}

  async find (id: Id): Promise<Comment> {
    const comment = await this.repository.find(id)

    if (!comment) throw new CommentNotFound(id)

    return comment
  }
}
