import { PageView } from '@Metrics/PageView/domain/PageView'
import { CommunityId } from '@Metrics/PageView/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/PageView/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/PageView/domain/ValueObjects/Id'
import { SpaceID } from '@Metrics/PageView/domain/ValueObjects/SpaceId'
import { UserId } from '@Metrics/PageView/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const PageViewSchema = new EntitySchema<PageView>({
  name: 'PageView',
  target: PageView,
  tableName: 'pageview',
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
    spaceId: {
      type: String,
      transformer: ValueObjectTransformer(SpaceID)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    }
}
})