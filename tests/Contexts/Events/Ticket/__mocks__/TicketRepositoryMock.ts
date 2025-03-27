import { Ticket } from '@Events/Ticket/domain/Ticket'
import { TicketRepository } from '@Events/Ticket/domain/TicketRepository'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class TicketRepositoryMock implements TicketRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Ticket>
  private expectedSearch: Array<Ticket> = []

  async find (id: Id): Promise<Nullable<Ticket>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (ticket: Nullable<Ticket>): void {
    this.expectedFind = ticket
  }

  returnOnSearch (ticket: Array<Ticket>): void {
    this.expectedSearch = ticket
  }

  async search (criteria: Criteria): Promise<Array<Ticket>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (ticket: Ticket): Promise<void> {
    this.mockPersist(ticket)
  }

  assertPersistHasBeenCalledWith (ticket: Ticket) {
    expect(this.mockPersist).toHaveBeenCalledWith(ticket)
  }

  async delete (ticket: Ticket): Promise<void> {
    this.mockDelete(ticket)
  }

  assertDeleteHasBeenCalledWith (ticket: Ticket) {
    expect(this.mockDelete).toHaveBeenCalledWith(ticket)
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
