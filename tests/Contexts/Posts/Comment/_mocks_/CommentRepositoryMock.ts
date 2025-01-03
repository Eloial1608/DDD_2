import { Comment } from '@Posts/Comment/domain/Comment'
import { CommentRepository } from '@Posts/Comment/domain/CommentRepository'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class CommentRepositoryMock implements CommentRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Comment>
  private expectedSearch: Array<Comment> = []

  async find (id: Id): Promise<Nullable<Comment>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (comment: Nullable<Comment>): void {
    this.expectedFind = comment
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  async search (criteria: Criteria): Promise<Array<Comment>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  returnOnSearch (comment: Array<Comment>): void {
    this.expectedSearch = comment
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }

  async persist (comment: Comment): Promise<void> {
    this.mockPersist(comment)
  }

  assertPersistHasBeenCalledWith (comment: Comment) {
    expect(this.mockPersist).toHaveBeenCalledWith(comment)
  }

  assertPersistHasNotBeenCalled () {
    expect(this.mockPersist).not.toHaveBeenCalled()
  }

  async delete (comment: Comment): Promise<void> {
    this.mockDelete(comment)
  }

  assertDeleteHasBeenCalledWith (comment: Comment) {
    expect(this.mockDelete).toHaveBeenCalledWith(comment)
  }

  assertDeleteHasNotBeenCalled () {
    expect(this.mockDelete).not.toHaveBeenCalled()
  }
}
