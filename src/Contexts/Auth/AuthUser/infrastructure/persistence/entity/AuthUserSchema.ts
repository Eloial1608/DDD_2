import { CreatedAt } from '@Auth/AuthUser/domain/ValueObjects/CreatedAt'
import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'
import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Email } from '@Auth/AuthUser/domain/ValueObjects/Email'
import { Method } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { UserId } from '@Auth/AuthUser/domain/ValueObjects/UserId'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'

export const AuthUserSchema = new EntitySchema<AuthUser>({
  name: 'AuthUser',
  target: AuthUser,
  tableName: 'auth_user',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(Email)
    },
    method: {
      type: String,
      transformer: ValueObjectTransformer(Method)
    },
    secret: {
      type: String,
      transformer: ValueObjectTransformer(Secret)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_AUTH_USER_COMMUNITYID',
      columns: ['communityId']
    },
    {
      name: 'IDX_AUTH_USER_METHOD',
      columns: ['method']
    },
    {
      name: 'IDX_AUTH_USER_SECRET',
      columns: ['secret']
    }
  ]
})
