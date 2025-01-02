import { Post } from '@Posts/Post/domain/Post'
import { PostRepository } from '@Posts/Post/domain/PostRepository'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class PostRepositoryMock implements PostRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Post>
  private expectedSearch: Array<Post> = []

  async find (id: Id): Promise<Nullable<Post>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (post: Nullable<Post>): void {
    this.expectedFind = post
  }

  returnOnSearch (post: Array<Post>): void {
    this.expectedSearch = post
  }

  async search (criteria: Criteria): Promise<Array<Post>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (post: Post): Promise<void> {
    this.mockPersist(post)
  }

  assertPersistHasBeenCalledWith (post: Post) {
    expect(this.mockPersist).toHaveBeenCalledWith(post)
  }

  assertPersistHasNotBeenCalled () {
    expect(this.mockPersist).not.toHaveBeenCalled()
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
