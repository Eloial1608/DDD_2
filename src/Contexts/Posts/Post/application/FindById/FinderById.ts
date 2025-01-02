import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { Post } from '@Posts/Post/domain/Post'
import { PostNotFound } from '@Posts/Post/domain/Errors/PostNotFound'

export class FinderById {
  constructor (private readonly repository: PostRepository) {}

  async find (id: Id): Promise<Post> {
    const post = await this.repository.find(id)

    if (!post) throw new PostNotFound(id)

    return post
  }
}
