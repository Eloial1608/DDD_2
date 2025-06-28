import { Author } from '@Course/Comment/domain/ValueObjects/Author'
import { Task } from '@Projects/Task/domain/Task'
import { CommunityId } from '@Projects/Task/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Projects/Task/domain/ValueObjects/CreatedAt'
import { Deadline } from '@Projects/Task/domain/ValueObjects/Deadline'
import { DeletedAt } from '@Projects/Task/domain/ValueObjects/DeletedAt'
import { Description } from '@Projects/Task/domain/ValueObjects/Description'
import { Id } from '@Projects/Task/domain/ValueObjects/Id'
import { Points } from '@Projects/Task/domain/ValueObjects/Points'
import { Priority } from '@Projects/Task/domain/ValueObjects/Priority'
import { ProjectId } from '@Projects/Task/domain/ValueObjects/ProjectId'
import { TaskStatus } from '@Projects/Task/domain/ValueObjects/TaskStatus'
import { TaskTypes } from '@Projects/Task/domain/ValueObjects/TaskTypes'
import { Title } from '@Projects/Task/domain/ValueObjects/Title'
import { UpdatedAt } from '@Projects/Task/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Projects/Task/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

const PostAuthorSchema = new EntitySchema<Author>({
  name: 'postAuthor',
  target: Author,
  columns: {
    id: {
      type: String
    },
    mainId: {
      type: String
    },
    name: {
      type: String
    },
    username: {
      type: String
    },
    pictureUrl: {
      type: String,
      nullable: true
    },
    bannerUrl: {
      type: String,
      nullable: true
    }
  }
})

export const TaskSchema = new EntitySchema<Task>({
  name: 'task',
  target: Task,
  tableName: 'task',
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
    assignedUserId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(UserId)
    },
    priority: {
      type: Number,
      nullable: true,
      transformer: ValueObjectTransformer(Priority)
    },
    status: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(TaskStatus)
    },
    type: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(TaskTypes)
    },
    deadline: {
      type: Date,
      nullable: true,
      transformer: ValueObjectTransformer(Deadline)
    },
    points: {
      type: Number,
      nullable: true,
      transformer: ValueObjectTransformer(Points)
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
  },
  embeddeds: {
    assignedUser: {
      schema: PostAuthorSchema,
      prefix: 'author'
    }
  }

})
