import { TicketRepository } from '@Events/Ticket/domain/TicketRepository'
import { Ticket } from '@Events/Ticket/domain/Ticket'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: TicketRepository) {}

  async find (criteria: Criteria): Promise<Array<Ticket>> {
    return await this.repository.search(criteria)
  }
}
