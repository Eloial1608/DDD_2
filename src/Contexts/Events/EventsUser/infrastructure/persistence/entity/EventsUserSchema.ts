import { EventsUser } from '@Events/EventsUser/domain/EventsUser'
import { Id } from '@Events/EventsUser/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserId } from '@Events/EventsUser/domain/ValueObjects/UserId'
import { CreatedAt } from '@Events/EventsUser/domain/ValueObjects/CreatedAt'
import { EventId } from '@Events/EventsUser/domain/ValueObjects/EventId'

export const EventsUserSchema = new EntitySchema<EventsUser>({
  name: 'EventsUser',
  target: EventsUser,
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
