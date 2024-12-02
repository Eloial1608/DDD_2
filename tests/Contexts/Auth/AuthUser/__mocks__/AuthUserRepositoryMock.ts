import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'
import { AuthUserRepository } from '@Auth/AuthUser/domain/AuthUserRepository'
import { CommunityId } from '@Auth/AuthUser/domain/ValueObjects/CommunityId'
import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'
import { Method } from '@Auth/AuthUser/domain/ValueObjects/Method'
import { Secret } from '@Auth/AuthUser/domain/ValueObjects/Secret'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class AuthUserRepositoryMock implements AuthUserRepository {
  private mockFind = mockFn()
  private mockFindByCommunityMethodAndSecret = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<AuthUser>
  private expectedFindByCommunityMethodAndSecret: Nullable<AuthUser>
  private expectedSearch: Array<AuthUser> = []

  async find (id: Id): Promise<Nullable<AuthUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (authUser: Nullable<AuthUser>): void {
    this.expectedFind = authUser
  }

  async findByCommunityMethodAndSecret (communityId: CommunityId, method: Method, secret: Secret): Promise<Nullable<AuthUser>> {
    this.mockFindByCommunityMethodAndSecret(communityId, method, secret)
    return this.expectedFindByCommunityMethodAndSecret
  }

  returnOnFindByCommunityMethodAndSecret (authUser: Nullable<AuthUser>): void {
    this.expectedFindByCommunityMethodAndSecret = authUser
  }

  returnOnSearch (authUser: Array<AuthUser>): void {
    this.expectedSearch = authUser
  }

  async search (criteria: Criteria): Promise<Array<AuthUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (authUser: AuthUser): Promise<void> {
    this.mockPersist(authUser)
  }

  assertPersistHasBeenCalledWith (authUser: AuthUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(authUser)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertFindByCommunityMethodAndSecretHasBeenCalledWith (communityId: CommunityId, method: Method, secret: Secret) {
    expect(this.mockFindByCommunityMethodAndSecret).toHaveBeenCalledWith(communityId, method, secret)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
