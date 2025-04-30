import { Ticket } from '@Events/Ticket/domain/Ticket'
import { TicketRepository } from '@Events/Ticket/domain/TicketRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { TicketSchema } from './entity/TicketSchema'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmTicketRepository extends TypeOrmRepository<Ticket> implements TicketRepository {
  protected get entitySchema (): EntitySchema {
    return TicketSchema
  }

  async find (id: Id): Promise<Nullable<Ticket>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Ticket[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (ticket: Ticket): Promise<void> {
    await (await this.repository()).save(ticket)
  }

  async delete (ticket: Ticket): Promise<void> {
    await (await this.repository()).remove(ticket)
  }
}
