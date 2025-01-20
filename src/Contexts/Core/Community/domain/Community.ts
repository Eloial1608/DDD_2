import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { Suffix } from './ValueObjects/Suffix'
import { Domain } from './ValueObjects/Domain'
import { MembersCount } from './ValueObjects/MembersCount'
import { FirstPaymentDone } from './ValueObjects/FirstPaymentDone'
import { SpacesCount } from './ValueObjects/SpacesCount'
import { HasPayment } from './ValueObjects/HasPayment'
import { AllowedFeatures } from './ValueObjects/AllowedFeatures'
import { HasRegisterForm } from './ValueObjects/HasRegisterForm'
import { RegisterFormId } from './ValueObjects/RegisterFormId'
import { AllowedUsers } from './ValueObjects/AllowedUsers'
import { Color } from './ValueObjects/Color'
import { IsPrivate } from './ValueObjects/IsPrivate'
import { IsRegisterOpen } from './ValueObjects/IsRegisterOpen'
import { HomeSpaceId } from './ValueObjects/HomeSpaceId'
import { ExpiresAt } from './ValueObjects/ExpiresAt'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { CommunityCreatedDomainEvent } from './Events/CommunityCreatedDomainEvent'
import { CommunityDeletedDomainEvent } from './Events/CommunityDeletedDomainEvent'
import { MethodId } from './ValueObjects/MethodId'
import { CommunityMembersCountUpdatedDomainEvent } from './Events/CommunityMembersCountUpdatedDomainEvent'
import { Slug } from './ValueObjects/Slug'
import { ParentId } from './ValueObjects/ParentId'
import { MainId } from './ValueObjects/MainId'
import { LogoUrl } from './ValueObjects/LogoUrl'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { About } from './ValueObjects/About'
import { CommunitySpacesCountUpdatedDomainEvent } from './Events/CommunitySpacesCountUpdatedDomainEvent'
import { AllowsPayments } from './ValueObjects/AllowsPayments'
import { CommunityAllowsPaymentsUpdatedDomainEvent } from './Events/CommunityAllowsPaymentsUpdatedDomainEvent'
import { AllowedSubcommunities } from './ValueObjects/AllowedSubcommunities'
import { SubcommunitiesCount } from './ValueObjects/SubcommunitiesCount'
import { CommunitySubcommunitiesCountUpdatedDomainEvent } from './Events/CommunitySubcommunitiesCountUpdatedDomainEvent'
import { CommunityUpdatedDomainEvent } from './Events/CommunityUpdatedDomainEvent'

export class Community extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly name: Name,
        readonly suffix: Suffix,
        readonly domain: Nullable<Domain>,
        readonly slug: Slug,
        readonly parentId: Nullable<ParentId>,
        readonly mainId: Nullable<MainId>,
        readonly logoUrl: Nullable<LogoUrl>,
        readonly bannerUrl: Nullable<BannerUrl>,
        readonly about: Nullable<About>,
        readonly membersCount: MembersCount,
        readonly allowsPayments: AllowsPayments,
        readonly firstPaymentDone: FirstPaymentDone,
        readonly spacesCount: SpacesCount,
        readonly hasPayment: HasPayment,
        readonly methodId: Nullable<MethodId>,
        readonly allowedFeatures: AllowedFeatures,
        readonly hasRegisterForm: HasRegisterForm,
        readonly registerFormId: Nullable<RegisterFormId>,
        readonly allowedUsers: AllowedUsers,
        readonly color: Color,
        readonly isPrivate: IsPrivate,
        readonly isRegisterOpen: IsRegisterOpen,
        readonly homeSpaceId: Nullable<HomeSpaceId>,
        readonly allowedSubcommunities: AllowedSubcommunities,
        readonly subcommunitiesCount: SubcommunitiesCount,
        readonly expiresAt: ExpiresAt,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    name: Name,
    slug: Slug,
    parentId: Nullable<ParentId>,
    mainId: Nullable<MainId>,
    logoUrl: Nullable<LogoUrl>,
    bannerUrl: Nullable<BannerUrl>,
    suffix: Suffix,
    color: Color,
    allowedFeatures: AllowedFeatures,
    allowedUsers: AllowedUsers,
    expiresAt: ExpiresAt,
    allowedSubcommunities: AllowedSubcommunities
  ): Community {
    const community = new Community(
      id,
      name,
      suffix,
      null,
      slug,
      parentId,
      mainId,
      logoUrl,
      bannerUrl,
      null,
      new MembersCount(0),
      new AllowsPayments(false),
      new FirstPaymentDone(false),
      new SpacesCount(1),
      new HasPayment(false),
      null,
      allowedFeatures,
      new HasRegisterForm(false),
      null,
      allowedUsers,
      color,
      new IsPrivate(false),
      new IsRegisterOpen(true),
      null,
      allowedSubcommunities,
      new SubcommunitiesCount(0),
      expiresAt,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    community.record(CommunityCreatedDomainEvent.fromAggregate(community))

    return community
  }

  update (
    id: Id,
    name: Name,
    slug: Slug,
    domain: Nullable<Domain>,
    about: Nullable<About>,
    isPrivate: IsPrivate,
    isRegisterOpen: IsRegisterOpen,
    logoUrl: Nullable<LogoUrl>,
    bannerUrl: Nullable<BannerUrl>,
    suffix: Suffix,
    color: Color
  ): Community {
    const community = new Community(
      id,
      name,
      suffix,
      domain,
      slug,
      this.parentId,
      this.mainId,
      logoUrl,
      bannerUrl,
      about,
      this.membersCount,
      this.allowsPayments,
      this.firstPaymentDone,
      this.spacesCount,
      this.hasPayment,
      this.methodId,
      this.allowedFeatures,
      this.hasRegisterForm,
      this.registerFormId,
      this.allowedUsers,
      color,
      isPrivate,
      isRegisterOpen,
      this.homeSpaceId,
      this.allowedSubcommunities,
      this.subcommunitiesCount,
      this.expiresAt,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    community.record(CommunityUpdatedDomainEvent.fromAggregate(community))

    return community
  }

  delete (): Community {
    const community = new Community(
      this.id,
      this.name,
      this.suffix,
      this.domain,
      this.slug,
      this.parentId,
      this.mainId,
      this.logoUrl,
      this.bannerUrl,
      this.about,
      this.membersCount,
      this.allowsPayments,
      this.firstPaymentDone,
      this.spacesCount,
      this.hasPayment,
      this.methodId,
      this.allowedFeatures,
      this.hasRegisterForm,
      this.registerFormId,
      this.allowedUsers,
      this.color,
      this.isPrivate,
      this.isRegisterOpen,
      this.homeSpaceId,
      this.allowedSubcommunities,
      this.subcommunitiesCount,
      this.expiresAt,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    community.record(CommunityDeletedDomainEvent.fromAggregate(community))

    return community
  }

  updateMembersCount (membersCount: MembersCount): Community {
    const community = new Community(
      this.id,
      this.name,
      this.suffix,
      this.domain,
      this.slug,
      this.parentId,
      this.mainId,
      this.logoUrl,
      this.bannerUrl,
      this.about,
      membersCount,
      this.allowsPayments,
      this.firstPaymentDone,
      this.spacesCount,
      this.hasPayment,
      this.methodId,
      this.allowedFeatures,
      this.hasRegisterForm,
      this.registerFormId,
      this.allowedUsers,
      this.color,
      this.isPrivate,
      this.isRegisterOpen,
      this.homeSpaceId,
      this.allowedSubcommunities,
      this.subcommunitiesCount,
      this.expiresAt,
      this.createdAt,
      this.updatedAt,
      null
    )

    community.record(CommunityMembersCountUpdatedDomainEvent.fromAggregate(community))

    return community
  }

  updateSubcommunitiesCount (subcommunitiesCount: SubcommunitiesCount): Community {
    const community = new Community(
      this.id,
      this.name,
      this.suffix,
      this.domain,
      this.slug,
      this.parentId,
      this.mainId,
      this.logoUrl,
      this.bannerUrl,
      this.about,
      this.membersCount,
      this.allowsPayments,
      this.firstPaymentDone,
      this.spacesCount,
      this.hasPayment,
      this.methodId,
      this.allowedFeatures,
      this.hasRegisterForm,
      this.registerFormId,
      this.allowedUsers,
      this.color,
      this.isPrivate,
      this.isRegisterOpen,
      this.homeSpaceId,
      this.allowedSubcommunities,
      subcommunitiesCount,
      this.expiresAt,
      this.createdAt,
      this.updatedAt,
      null
    )

    community.record(CommunitySubcommunitiesCountUpdatedDomainEvent.fromAggregate(community))

    return community
  }

  updateAllowsPayments (allowsPayments: AllowsPayments): Community {
    const community = new Community(
      this.id,
      this.name,
      this.suffix,
      this.domain,
      this.slug,
      this.parentId,
      this.mainId,
      this.logoUrl,
      this.bannerUrl,
      this.about,
      this.membersCount,
      allowsPayments,
      this.firstPaymentDone,
      this.spacesCount,
      this.hasPayment,
      this.methodId,
      this.allowedFeatures,
      this.hasRegisterForm,
      this.registerFormId,
      this.allowedUsers,
      this.color,
      this.isPrivate,
      this.isRegisterOpen,
      this.homeSpaceId,
      this.allowedSubcommunities,
      this.subcommunitiesCount,
      this.expiresAt,
      this.createdAt,
      this.updatedAt,
      null
    )

    community.record(CommunityAllowsPaymentsUpdatedDomainEvent.fromAggregate(community))

    return community
  }

  updateSpacesCount (spacesCount: SpacesCount): Community {
    const community = new Community(
      this.id,
      this.name,
      this.suffix,
      this.domain,
      this.slug,
      this.parentId,
      this.mainId,
      this.logoUrl,
      this.bannerUrl,
      this.about,
      this.membersCount,
      this.allowsPayments,
      this.firstPaymentDone,
      spacesCount,
      this.hasPayment,
      this.methodId,
      this.allowedFeatures,
      this.hasRegisterForm,
      this.registerFormId,
      this.allowedUsers,
      this.color,
      this.isPrivate,
      this.isRegisterOpen,
      this.homeSpaceId,
      this.allowedSubcommunities,
      this.subcommunitiesCount,
      this.expiresAt,
      this.createdAt,
      this.updatedAt,
      null
    )

    community.record(CommunitySpacesCountUpdatedDomainEvent.fromAggregate(community))

    return community
  }
}
