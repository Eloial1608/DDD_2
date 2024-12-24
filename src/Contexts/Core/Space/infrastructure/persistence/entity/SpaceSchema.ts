import { Space } from '@Core/Space/domain/Space'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { Name } from '@Core/Space/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/Space/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Space/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/Space/domain/ValueObjects/DeletedAt'
import { Price, PriceCurrency, PriceValue } from '@Core/Space/domain/ValueObjects/Price'
import { Slug } from '@Core/Space/domain/ValueObjects/Slug'
import { ParentId } from '@Core/Space/domain/ValueObjects/ParentId'
import { TotalMembers } from '@Core/Space/domain/ValueObjects/TotalMembers'
import { Icon } from '@Core/Space/domain/ValueObjects/Icon'
import { CreatedBy } from '@Core/Space/domain/ValueObjects/CreatedBy'
import { Accessibility } from '@Core/Space/domain/ValueObjects/Accessibility'
import { HeaderUrl } from '@Core/Space/domain/ValueObjects/HeaderUrl'
import { Type } from '@Core/Space/domain/ValueObjects/Type'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Core/Space/domain/ValueObjects/Configuration'

const SpacePriceSchema = new EntitySchema<Price>({
  name: 'spacePrice',
  target: Price,
  columns: {
    value: {
      type: 'int',
      nullable: true,
      transformer: ValueObjectTransformer(PriceValue)
    },
    currency: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(PriceCurrency)
    }
  }
})

export const SpaceSchema = new EntitySchema<Space>({
  name: 'Space',
  target: Space,
  tableName: 'space',
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
    configuration: {
      type: String,
      transformer: {
        from: (value: string): Configuration => new Configuration(JSON.parse(value)),
        to: (configuration: Configuration): string => JSON.stringify(configuration.configuration)
      }
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    slug: {
      type: String,
      transformer: ValueObjectTransformer(Slug)
    },
    parentId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(ParentId)
    },
    totalMembers: {
      type: 'int',
      transformer: ValueObjectTransformer(TotalMembers)
    },
    icon: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Icon)
    },
    createdBy: {
      type: String,
      transformer: ValueObjectTransformer(CreatedBy)
    },
    accessibility: {
      type: String,
      transformer: ValueObjectTransformer(Accessibility)
    },
    headerUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(HeaderUrl)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(Type)
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
      schema: SpacePriceSchema,
      prefix: 'price'
    }
  },
  indices: [
    {
      name: 'IDX_SPACE_COMMUNITY_ID',
      columns: ['communityId']
    }
  ]
})
