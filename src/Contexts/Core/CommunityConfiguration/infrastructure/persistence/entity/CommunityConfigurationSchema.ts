import { CommunityConfiguration } from '@Core/CommunityConfiguration/domain/CommunityConfiguration'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { Id } from '@Core/CommunityConfiguration/domain/ValueObjects/Id'
import { EntitySchema } from 'typeorm'
import { CommunityId } from '@Core/CommunityConfiguration/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/CommunityConfiguration/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/CommunityConfiguration/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/CommunityConfiguration/domain/ValueObjects/DeletedAt'
import { CurrentTheme } from '@Core/CommunityConfiguration/domain/ValueObjects/CurrentTheme'

export const CommunityConfigurationSchema = new EntitySchema<CommunityConfiguration>({
  name: 'CommunityConfiguration',
  target: CommunityConfiguration,
  tableName: 'communityconfiguration',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    communityId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(CommunityId)
    },
    currentTheme: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(CurrentTheme)
    },
    createdAt: {
      type: Date,
      updateDate: true,
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
  indices: [
    {
      name: 'IDX_COMMUNITYCONFIGURATION_COMMUNITY_ID',
      columns: ['communityId']
    }
  ]
})
