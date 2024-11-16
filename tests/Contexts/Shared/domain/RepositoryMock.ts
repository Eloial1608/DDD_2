import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { ValueObject } from '@Shared/domain/ValueObjects/ValueObject'
import { mockFn } from '../../mockUtils'

export class RepositoryMock<T extends AggregateRoot, I extends ValueObject<string>> {
  private mockSave = mockFn()
  private mockSearch = mockFn()

  async persist (aggregate: T): Promise<void> {
    this.mockSave(aggregate)
  }

  assertLastSaveIs (expected: T): void {
    const mock = this.mockSave.mock
    const lastSavedAggregate = mock.calls[mock.calls.length - 1][0] as T
    expect(lastSavedAggregate).toEqual(expected)
  }

  whenSearchThenReturn (value: Nullable<T>): void {
    this.mockSearch.mockReturnValue(value)
  }

  async search (id: I): Promise<Nullable<T>> {
    return this.mockSearch(id)
  }

  assertLastSearchIs (expected: I): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected)
  }
}
