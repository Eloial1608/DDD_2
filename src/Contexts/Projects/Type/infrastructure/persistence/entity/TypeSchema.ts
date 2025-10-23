import { Type } from '@Projects/Type/domain/Type'
import { Color } from '@Projects/Type/domain/ValueObjects/Color'
import { CommunityId } from '@Projects/Type/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Projects/Type/domain/ValueObjects/CreatedAt'
import { DeletedAt } from '@Projects/Type/domain/ValueObjects/DeletedAt'
import { Description } from '@Projects/Type/domain/ValueObjects/Description'
import { Id } from '@Projects/Type/domain/ValueObjects/Id'
import { ProjectId } from '@Projects/Type/domain/ValueObjects/ProjectId'
import { Title } from '@Projects/Type/domain/ValueObjects/Title'
import { UpdatedAt } from '@Projects/Type/domain/ValueObjects/UpdatedAt'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const TypeSchema = new EntitySchema<Type>({
  name: 'type',
  target: Type,
  tableName: 'type',
  columns: {
    id: {
      primary: true,
      type: String,
      transformer: ValueObjectTransformer(Id)
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(Title)
    },
    description: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Description)
    },
    color: {
      type: String,
      transformer: ValueObjectTransformer(Color)
    },
    projectId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(ProjectId)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      nullable: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }

  }
})
