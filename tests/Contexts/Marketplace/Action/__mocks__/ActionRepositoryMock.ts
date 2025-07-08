import type { Action } from '@Marketplace/Action/domain/Action'
import type { ActionRepository } from '@Marketplace/Action/domain/ActionRepository'
import type { Id } from '@Marketplace/Action/domain/ValueObjects/Id'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ActionRepositoryMock implements ActionRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Action>
  private expectedSearch: Array<Action> = []

  async find (id: Id): Promise<Nullable<Action>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (Action: Nullable<Action>): void {
    this.expectedFind = Action
  }

  returnOnSearch (Action: Array<Action>): void {
    this.expectedSearch = Action
  }

  async search (criteria: Criteria): Promise<Array<Action>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (Action: Action): Promise<void> {
    this.mockPersist(Action)
  }

  async delete (Action: Action): Promise<void> {
    this.mockDelete(Action)
  }

  assertDeleteHasBeenCalledWith (Action: Action) {
    expect(this.mockDelete).toHaveBeenCalledWith(Action)
  }

  assertDeleteHasNotBeenCalled () {
    expect(this.mockDelete).not.toHaveBeenCalled()
  }

  assertPersistHasBeenCalledWith (Action: Action) {
    expect(this.mockPersist).toHaveBeenCalledWith(Action)
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
