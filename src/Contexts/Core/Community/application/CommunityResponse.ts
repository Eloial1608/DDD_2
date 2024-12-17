import { Nullable } from '@Shared/domain/Nullable'
import { Community } from '../domain/Community'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type CommunityResponseBody = {
    readonly id: string
    readonly name: string
    readonly suffix: string
    readonly slug: string
    readonly parentId: Nullable<string>
    readonly mainId: Nullable<string>
    readonly logoUrl: Nullable<string>
    readonly bannerUrl: Nullable<string>
    readonly about: Nullable<string>
    readonly domain: Nullable<string>
    readonly membersCount: number
    readonly firstPaymentDone: boolean
    readonly spacesCount: number
    readonly hasPayment: boolean
    readonly allowedFeatures: string[]
    readonly hasRegisterForm: boolean
    readonly registerFormId: Nullable<string>
    readonly allowedUsers: number
    readonly color: string
    readonly isPrivate: boolean
    readonly isRegisterOpen: boolean
    readonly homeSpaceId: string
    readonly expiresAt: Date
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class CommunityResponse implements QueryResponse<CommunityResponseBody> {
  response: CommunityResponseBody

  constructor (community: Community) {
    this.response = {
      id: community.id.valueOf(),
      name: community.name.valueOf(),
      suffix: community.suffix.valueOf(),
      domain: community.domain?.valueOf(),
      slug: community.slug.valueOf(),
      parentId: community.parentId?.valueOf(),
      mainId: community.mainId?.valueOf(),
      logoUrl: community.logoUrl?.valueOf(),
      bannerUrl: community.bannerUrl?.valueOf(),
      about: community.about?.valueOf(),
      membersCount: community.membersCount.valueOf(),
      firstPaymentDone: community.firstPaymentDone.valueOf(),
      spacesCount: community.spacesCount.valueOf(),
      hasPayment: community.hasPayment.valueOf(),
      allowedFeatures: community.allowedFeatures.valueOf().map(x => x.valueOf()),
      hasRegisterForm: community.hasRegisterForm.valueOf(),
      registerFormId: community.registerFormId?.valueOf(),
      allowedUsers: community.allowedUsers.valueOf(),
      color: community.color.valueOf(),
      isPrivate: community.isPrivate.valueOf(),
      isRegisterOpen: community.isRegisterOpen.valueOf(),
      homeSpaceId: community.homeSpaceId.valueOf(),
      expiresAt: community.expiresAt.valueOf(),
      createdAt: community.createdAt.valueOf(),
      updatedAt: community.updatedAt.valueOf()
    }
  }
}
