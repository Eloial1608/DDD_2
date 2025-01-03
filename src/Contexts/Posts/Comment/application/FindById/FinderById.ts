import { CommentRepository } from '@Posts/Comment/domain/CommentRepository'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { Comment } from '@Posts/Comment/domain/Comment'
import { CommentNotFound } from '@Posts/Comment/domain/Errors/CommentNotFound'

export class FinderById {
  constructor (private readonly repository: CommentRepository) {}

  async find (id: Id): Promise<Comment> {
    const comment = await this.repository.find(id)

    if (!comment) throw new CommentNotFound(id)

    return comment
  }
}
