import { Calendar } from '@Core/Calendar/domain/Calendar'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/Calendar/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Calendar/domain/ValueObjects/UpdatedAt'
import { CommunityId } from '@Core/Calendar/domain/ValueObjects/CommunityId'
import { DateAt } from '@Core/Calendar/domain/ValueObjects/DateAt'
import { UserIds } from '@Core/Calendar/domain/ValueObjects/UserIds'
import { EntityType } from '@Core/Calendar/domain/ValueObjects/EntityType'
import { EntityId } from '@Core/Calendar/domain/ValueObjects/EntityId'
import { Content } from '@Core/Calendar/domain/ValueObjects/Content'

export const CalendarSchema = new EntitySchema<Calendar>({
  name: 'Calendar',
  target: Calendar,
  tableName: 'calendar',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    dateAt: {
      type: Date,
      transformer: ValueObjectTransformer(DateAt)
    },
    userIds: {
      type: 'simple-array',
      transformer: ValueObjectTransformer(UserIds)
    },
    entityType: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(EntityType)
    },
    entityId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(EntityId)
    },
    content: {
      type: String,
      transformer: ValueObjectTransformer(Content)
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
    }
  },
  indices: [
    {
      name: 'IDX_CALENDAR_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_CALENDAR_USER_IDS',
      columns: ['userIds']
    }
  ]
})
