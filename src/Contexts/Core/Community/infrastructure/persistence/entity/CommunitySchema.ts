import { Community } from '@Core/Community/domain/Community'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { IsRegisterOpen } from '@Core/Community/domain/ValueObjects/IsRegisterOpen'
import { IsPrivate } from '@Core/Community/domain/ValueObjects/IsPrivate'
import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { CreatedAt } from '@Core/Community/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Community/domain/ValueObjects/UpdatedAt'
import { HasPayment } from '@Core/Community/domain/ValueObjects/HasPayment'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { Domain } from '@Core/Community/domain/ValueObjects/Domain'
import { MembersCount } from '@Core/Community/domain/ValueObjects/MembersCount'
import { FirstPaymentDone } from '@Core/Community/domain/ValueObjects/FirstPaymentDone'
import { SpacesCount } from '@Core/Community/domain/ValueObjects/SpacesCount'
import { AllowedFeatures } from '@Core/Community/domain/ValueObjects/AllowedFeatures'
import { HasRegisterForm } from '@Core/Community/domain/ValueObjects/HasRegisterForm'
import { RegisterFormId } from '@Core/Community/domain/ValueObjects/RegisterFormId'
import { AllowedUsers } from '@Core/Community/domain/ValueObjects/AllowedUsers'
import { HomeSpaceId } from '@Core/Community/domain/ValueObjects/HomeSpaceId'
import { ExpiresAt } from '@Core/Community/domain/ValueObjects/ExpiresAt'
import { DeletedAt } from '@Core/Community/domain/ValueObjects/DeletedAt'
import { MethodId } from '@Core/Community/domain/ValueObjects/MethodId'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { MainId } from '@Core/Community/domain/ValueObjects/MainId'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'
import { About } from '@Core/Community/domain/ValueObjects/About'
import { AllowsPayments } from '@Core/Community/domain/ValueObjects/AllowsPayments'
import { AllowedSubcommunities } from '@Core/Community/domain/ValueObjects/AllowedSubcommunities'
import { SubcommunitiesCount } from '@Core/Community/domain/ValueObjects/SubcommunitiesCount'

export const CommunitySchema = new EntitySchema<Community>({
  name: 'Community',
  target: Community,
  tableName: 'community',
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
    suffix: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Suffix)
    },
    slug: {
      type: String,
      transformer: ValueObjectTransformer(Slug)
    },
    parentId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(ParentId)
    },
    mainId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(MainId)
    },
    logoUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(LogoUrl)
    },
    bannerUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(BannerUrl)
    },
    allowsPayments: {
      type: Boolean,
      transformer: ValueObjectTransformer(AllowsPayments)
    },
    about: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(About)
    },
    methodId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(MethodId)
    },
    domain: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Domain)
    },
    membersCount: {
      type: 'int',
      default: 0,
      transformer: ValueObjectTransformer(MembersCount)
    },
    allowedSubcommunities: {
      type: 'int',
      default: 0,
      transformer: ValueObjectTransformer(AllowedSubcommunities)
    },
    subcommunitiesCount: {
      type: 'int',
      default: 0,
      transformer: ValueObjectTransformer(SubcommunitiesCount)
    },
    firstPaymentDone: {
      type: Boolean,
      default: false,
      transformer: ValueObjectTransformer(FirstPaymentDone)
    },
    spacesCount: {
      type: 'int',
      default: 0,
      transformer: ValueObjectTransformer(SpacesCount)
    },
    hasPayment: {
      type: Boolean,
      default: false,
      transformer: ValueObjectTransformer(HasPayment)
    },
    allowedFeatures: {
      type: 'jsonb',
      transformer: {
        to: (data: AllowedFeatures): string => JSON.stringify(data.valueOf().map(x => x.valueOf())),
        from: (data: string): AllowedFeatures => AllowedFeatures.fromPrimitives(JSON.parse(data))
      }
    },
    hasRegisterForm: {
      type: Boolean,
      transformer: ValueObjectTransformer(HasRegisterForm)
    },
    registerFormId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(RegisterFormId)
    },
    allowedUsers: {
      type: 'int',
      default: 1,
      transformer: ValueObjectTransformer(AllowedUsers)
    },
    color: {
      type: String,
      transformer: {
        to: (data: Color): string => JSON.stringify(data.valueOf()),
        from: (data: string): Color => new Color(JSON.parse(data))
      }
    },
    isPrivate: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsPrivate),
      default: false
    },
    isRegisterOpen: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsRegisterOpen),
      default: true
    },
    homeSpaceId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(HomeSpaceId)
    },
    expiresAt: {
      type: Date,
      transformer: ValueObjectTransformer(ExpiresAt)
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
      name: 'IDX_COMMUNITY_DOMAIN',
      columns: ['domain']
    },
    {
      name: 'IDX_COMMUNITY_SUFFIX',
      columns: ['suffix']
    },
    {
      name: 'IDX_COMMUNITY_SLUG',
      columns: ['slug']
    }
  ]
})
