import { Form } from '@Core/Form/domain/Form'
import { FormRepository } from '@Core/Form/domain/FormRepository'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class FormRepositoryMock implements FormRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Form>
  private expectedSearch: Array<Form> = []

  async find (id: Id): Promise<Nullable<Form>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (form: Nullable<Form>): void {
    this.expectedFind = form
  }

  returnOnSearch (form: Array<Form>): void {
    this.expectedSearch = form
  }

  async search (criteria: Criteria): Promise<Array<Form>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (form: Form): Promise<void> {
    this.mockPersist(form)
  }

  assertPersistHasBeenCalledWith (form: Form) {
    expect(this.mockPersist).toHaveBeenCalledWith(form)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
