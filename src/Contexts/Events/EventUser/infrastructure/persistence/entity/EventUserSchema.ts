import { EventUser } from '@Events/EventUser/domain/EventUser'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserId } from '@Events/EventUser/domain/ValueObjects/UserId'
import { CreatedAt } from '@Events/EventUser/domain/ValueObjects/CreatedAt'
import { EventId } from '@Events/EventUser/domain/ValueObjects/EventId'
import { TicketId } from '@Events/EventUser/domain/ValueObjects/TicketId'

export const EventUserSchema = new EntitySchema<EventUser>({
  name: 'EventUser',
  target: EventUser,
  tableName: 'events_user',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    eventId: {
      type: String,
      transformer: ValueObjectTransformer(EventId)
    },
    ticketId: {
      type: String,
      transformer: ValueObjectTransformer(TicketId)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_EVENTS_USER_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_EVENTS_USER_EVENTS_ID',
      columns: ['eventId']
    }
  ]
})
