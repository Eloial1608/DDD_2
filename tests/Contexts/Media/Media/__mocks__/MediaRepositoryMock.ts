import { Media } from '@Media/Media/domain/Media'
import { MediaRepository } from '@Media/Media/domain/MediaRepository'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class MediaRepositoryMock implements MediaRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Media>
  private expectedSearch: Array<Media> = []

  async find (id: Id): Promise<Nullable<Media>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (media: Nullable<Media>): void {
    this.expectedFind = media
  }

  returnOnSearch (media: Array<Media>): void {
    this.expectedSearch = media
  }

  async search (criteria: Criteria): Promise<Array<Media>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (media: Media): Promise<void> {
    this.mockPersist(media)
  }

  assertPersistHasBeenCalledWith (media: Media) {
    expect(this.mockPersist).toHaveBeenCalledWith(media)
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
