import { Status } from '@Projects/Status/domain/Status'
import { CommunityId } from '@Projects/Status/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Projects/Status/domain/ValueObjects/CreatedAt'
import { DeletedAt } from '@Projects/Status/domain/ValueObjects/DeletedAt'
import { Description } from '@Projects/Status/domain/ValueObjects/Description'
import { Id } from '@Projects/Status/domain/ValueObjects/Id'
import { Order } from '@Projects/Status/domain/ValueObjects/Order'
import { Color } from '@Projects/Status/domain/ValueObjects/Color'
import { ProjectId } from '@Projects/Status/domain/ValueObjects/ProjectId'
import { Title } from '@Projects/Status/domain/ValueObjects/Title'
import { UpdatedAt } from '@Projects/Status/domain/ValueObjects/UpdatedAt'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const StatusSchema = new EntitySchema<Status>({
  name: 'status',
  target: Status,
  tableName: 'status',
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
    order: {
      type: Number,
      transformer: ValueObjectTransformer(Order)
    },
    color: {
      type: String,
      transformer: ValueObjectTransformer(Color)
    },
    projectId: {
      type: String,
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
