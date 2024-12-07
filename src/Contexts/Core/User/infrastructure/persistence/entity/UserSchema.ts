import { User } from '@Core/User/domain/User'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/User/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { About } from '@Core/User/domain/ValueObjects/About'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { HasPayed } from '@Core/User/domain/ValueObjects/HasPayed'
import { HasCompletedRegister } from '@Core/User/domain/ValueObjects/HasCompletedRegister'
import { RegisterData } from '@Core/User/domain/ValueObjects/RegisterData'
import { IsBanned } from '@Core/User/domain/ValueObjects/IsBanned'
import { TotalPosts } from '@Core/User/domain/ValueObjects/TotalPosts'
import { TotalMedia } from '@Core/User/domain/ValueObjects/TotalMedia'
import { TotalThreads } from '@Core/User/domain/ValueObjects/TotalThreads'
import { TotalThreadResponses } from '@Core/User/domain/ValueObjects/TotalThreadResponses'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'user',
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
    username: {
      type: String,
      transformer: ValueObjectTransformer(Username)
    },
    about: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(About)
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(Email)
    },
    hasPayed: {
      type: Boolean,
      transformer: ValueObjectTransformer(HasPayed)
    },
    planId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(HasPayed)
    },
    hasCompletedRegister: {
      type: Boolean,
      transformer: ValueObjectTransformer(HasCompletedRegister)
    },
    registerData: {
      type: 'jsonb',
      nullable: true,
      transformer: ValueObjectTransformer(RegisterData)
    },
    isBanned: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsBanned)
    },
    totalPosts: {
      type: 'int',
      transformer: ValueObjectTransformer(TotalPosts)
    },
    totalMedia: {
      type: 'int',
      transformer: ValueObjectTransformer(TotalMedia)
    },
    totalThreads: {
      type: 'int',
      transformer: ValueObjectTransformer(TotalThreads)
    },
    totalThreadResponses: {
      type: 'int',
      transformer: ValueObjectTransformer(TotalThreadResponses)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
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
  indices: [
    {
      name: 'IDX_USER_USERNAME',
      columns: ['username']
    }
  ]
})
