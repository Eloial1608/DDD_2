import { Title } from '@Core/Title/domain/Title'
import { CommunityId } from '@Core/Title/domain/ValueObjects/CommunityId'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { Name } from '@Core/Title/domain/ValueObjects/Name'
import { TitleImageUrl } from '@Core/Title/domain/ValueObjects/TitleImageUrl'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const TitleSchema = new EntitySchema<Title>({
  name: 'Title',
  target: Title,
  tableName: 'title',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    titleImageUrl: {
      type: String,
      transformer: ValueObjectTransformer(TitleImageUrl)
    }
  },
  indices: [
    {
      name: 'IDX_TITLE_NAME',
      columns: ['name']
    },
    {
      name: 'IDX_TITLE_COMMUNITY_ID',
      columns: ['communityId']
    }
  ]
})
