import { PostUser } from '@Posts/PostUser/domain/PostUser'
import { PostUserRepository } from '@Posts/PostUser/domain/PostUserRepository'
import { Id } from '@Posts/PostUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class PostUserRepositoryMock implements PostUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<PostUser>
  private expectedSearch: Array<PostUser> = []

  async find (id: Id): Promise<Nullable<PostUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (postUser: Nullable<PostUser>): void {
    this.expectedFind = postUser
  }

  returnOnSearch (postUser: Array<PostUser>): void {
    this.expectedSearch = postUser
  }

  async search (criteria: Criteria): Promise<Array<PostUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (postUser: PostUser): Promise<void> {
    this.mockPersist(postUser)
  }

  assertPersistHasBeenCalledWith (postUser: PostUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(postUser)
  }

  async delete (postUser: PostUser): Promise<void> {
    this.mockDelete(postUser)
  }

  assertDeleteHasBeenCalledWith (postUser: PostUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(postUser)
  }

  assertDeleteHasNotBeenCalled () {
    expect(this.mockDelete).not.toHaveBeenCalled()
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
