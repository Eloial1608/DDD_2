import { ProjectUser } from '@Projects/ProjectUser/domain/ProjectUser'
import { Id } from '@Projects/ProjectUser/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserId } from '@Projects/ProjectUser/domain/ValueObjects/UserId'
import { CreatedAt } from '@Projects/ProjectUser/domain/ValueObjects/CreatedAt'
import { ProjectId } from '@Projects/ProjectUser/domain/ValueObjects/ProjectId'

export const ProjectUserSchema = new EntitySchema<ProjectUser>({
  name: 'ProjectUser',
  target: ProjectUser,
  tableName: 'project_user',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    projectId: {
      type: String,
      transformer: ValueObjectTransformer(ProjectId)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_MEDIA_USER_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_MEDIA_USER_MEDIA_ID',
      columns: ['projectId']
    }
  ]
})
