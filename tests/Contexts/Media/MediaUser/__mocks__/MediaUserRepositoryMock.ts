import { MediaUser } from '@Media/MediaUser/domain/MediaUser'
import { MediaUserRepository } from '@Media/MediaUser/domain/MediaUserRepository'
import { Id } from '@Media/MediaUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class MediaUserRepositoryMock implements MediaUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<MediaUser>
  private expectedSearch: Array<MediaUser> = []

  async find (id: Id): Promise<Nullable<MediaUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (mediaUser: Nullable<MediaUser>): void {
    this.expectedFind = mediaUser
  }

  returnOnSearch (mediaUser: Array<MediaUser>): void {
    this.expectedSearch = mediaUser
  }

  async search (criteria: Criteria): Promise<Array<MediaUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (mediaUser: MediaUser): Promise<void> {
    this.mockPersist(mediaUser)
  }

  assertPersistHasBeenCalledWith (mediaUser: MediaUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(mediaUser)
  }

  async delete (mediaUser: MediaUser): Promise<void> {
    this.mockDelete(mediaUser)
  }

  assertDeleteHasBeenCalledWith (mediaUser: MediaUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(mediaUser)
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
