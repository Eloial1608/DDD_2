import { Ticket } from '@Events/Ticket/domain/Ticket'
import { CreatedAt } from '@Events/Ticket/domain/ValueObjects/CreatedAt'
import { DeletedAt } from '@Events/Ticket/domain/ValueObjects/DeletedAt'
import { Description } from '@Events/Ticket/domain/ValueObjects/Description'
import { EventId } from '@Events/Ticket/domain/ValueObjects/EventId'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { IsOnline } from '@Events/Ticket/domain/ValueObjects/IsOnline'
import { IsOnSite } from '@Events/Ticket/domain/ValueObjects/IsOnSite'
import { Price, PriceCurrency, PriceValue } from '@Events/Ticket/domain/ValueObjects/Price'
import { Title } from '@Events/Ticket/domain/ValueObjects/Title'
import { UpdatedAt } from '@Events/Ticket/domain/ValueObjects/UpdatedAt'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

const TicketPriceSchema = new EntitySchema<Price>({
  name: 'ticketPrice',
  target: Price,
  columns: {
    value: {
      type: 'int',
      transformer: ValueObjectTransformer(PriceValue)
    },
    currency: {
      type: String,
      transformer: ValueObjectTransformer(PriceCurrency)
    }
  }
})

export const TicketSchema = new EntitySchema<Ticket>({
  name: 'Ticket',
  target: Ticket,
  tableName: 'ticket',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    eventId: {
      type: String,
      transformer: ValueObjectTransformer(EventId)
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(Title)
    },
    description: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Description)
    },
    isOnline: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsOnline)
    },
    isOnSite: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsOnSite)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }
  },
  embeddeds: {
    price: {
      schema: TicketPriceSchema,
      prefix: 'price'
    }
  },
  indices: [
    {
      name: 'IDX_TICKET_EVENT_ID',
      columns: ['eventId']
    }
  ]
})
