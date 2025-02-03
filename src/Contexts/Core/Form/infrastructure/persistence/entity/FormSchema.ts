import { Form } from '@Core/Form/domain/Form'
import { Id } from '@Core/Form/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/Form/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Form/domain/ValueObjects/UpdatedAt'
import { CommunityId } from '@Core/Form/domain/ValueObjects/CommunityId'
import { Name } from '@Core/Form/domain/ValueObjects/Name'
import { IsActive } from '@Core/Form/domain/ValueObjects/IsActive'
import { FormContents } from '@Core/Form/domain/ValueObjects/FormContent'
import { CreatedBy } from '@Core/Form/domain/ValueObjects/CreatedBy'

export const FormSchema = new EntitySchema<Form>({
  name: 'Form',
  target: Form,
  tableName: 'form',
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
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    isActive: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsActive)
    },
    content: {
      type: String,
      transformer: {
        from: (data: string): FormContents => FormContents.fromPrimitives(JSON.parse(data)),
        to: (content: FormContents): string => JSON.stringify(content.toPrimitives())
      }
    },
    createdBy: {
      type: String,
      transformer: ValueObjectTransformer(CreatedBy)
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
      name: 'IDX_FORM_COMMUNITY_ID',
      columns: ['communityId']
    }
  ]
})
