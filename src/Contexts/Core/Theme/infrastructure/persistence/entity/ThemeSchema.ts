import { Theme } from '@Core/Theme/domain/Theme'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { EntitySchema } from 'typeorm'
import { CommunityId } from '@Core/Theme/domain/ValueObjects/CommunityId'
import { Name } from '@Core/Theme/domain/ValueObjects/Name'
import { PreviewPicUrl } from '@Core/Theme/domain/ValueObjects/PreviewPicUrl'
import { Colors } from '@Core/Theme/domain/ValueObjects/Colors'
import { Typography } from '@Core/Theme/domain/ValueObjects/Typography'
import { Components } from '@Core/Theme/domain/ValueObjects/Components'
import { Layout, LayoutSection } from '@Core/Theme/domain/ValueObjects/Layout'
import { CreatedAt } from '@Core/Theme/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Theme/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/Theme/domain/ValueObjects/DeletedAt'

const ThemeLayoutSchema = new EntitySchema<Layout>({
  name: 'themeLayout',
  target: Layout,
  columns: {
    header: {
      type: String,
      transformer: ValueObjectTransformer(LayoutSection)
    },
    nav: {
      type: String,
      transformer: ValueObjectTransformer(LayoutSection)
    },
    content: {
      type: String,
      transformer: ValueObjectTransformer(LayoutSection)
    },
    footer: {
      type: String,
      transformer: ValueObjectTransformer(LayoutSection)
    }
  }
})

export const ThemeSchema = new EntitySchema<Theme>({
  name: 'Theme',
  target: Theme,
  tableName: 'theme',
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
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    previewPicUrl: {
      type: String,
      transformer: ValueObjectTransformer(PreviewPicUrl)
    },
    colors: {
      type: String,
      transformer: ValueObjectTransformer(Colors)
    },
    typography: {
      type: String,
      transformer: ValueObjectTransformer(Typography)
    },
    components: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Components)
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
  embeddeds: {
    layout: {
      schema: ThemeLayoutSchema,
      prefix: 'layout'
    }
  },
  indices: [
    {
      name: 'IDX_THEME_COMMUNITY_ID',
      columns: ['communityId']
    }
  ]
})
