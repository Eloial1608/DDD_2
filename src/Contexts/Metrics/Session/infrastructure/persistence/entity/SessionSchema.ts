import { Session } from '@Metrics/Session/domain/Session'
import { CommunityId } from '@Metrics/Session/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/Session/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/Session/domain/ValueObjects/Id'
import { UserId } from '@Metrics/Session/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Country } from '@Metrics/Session/domain/ValueObjects/Country'
import { City } from '@Metrics/Session/domain/ValueObjects/City'

export const SessionSchema = new EntitySchema<Session>({
  name: 'Session',
  target: Session,
  tableName: 'session',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    userId: {
      type: Boolean,
      transformer: ValueObjectTransformer(UserId)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    country: {
      type: String,
      transformer: ValueObjectTransformer(Country)
    },
    city: {
      type: String,
      transformer: ValueObjectTransformer(City)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  }
})
