import { User } from '@Threads/User/domain/User'
import { Id } from '@Threads/User/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CommunityId } from '@Threads/User/domain/ValueObjects/CommunityId'
import { MainId } from '@Threads/User/domain/ValueObjects/MainId'
import { Name } from '@Threads/User/domain/ValueObjects/Name'
import { Username } from '@Threads/User/domain/ValueObjects/Username'
import { PictureUrl } from '@Threads/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Threads/User/domain/ValueObjects/BannerUrl'
import { IsAdmin } from '@Threads/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Threads/User/domain/ValueObjects/IsOwner'

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
    mainId: {
      type: String,
      transformer: ValueObjectTransformer(MainId)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    username: {
      type: String,
      transformer: ValueObjectTransformer(Username)
    },
    pictureUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(PictureUrl)
    },
    bannerUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(BannerUrl)
    },
    isAdmin: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsAdmin)
    },
    isOwner: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsOwner)
    }
  },
  indices: [
    {
      name: 'IDX_USER_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_USER_MAIN_ID',
      columns: ['mainId']
    }
  ]
})
