import { OAuthRepository, OAuthUser } from '@Auth/AuthUser/domain/OAuthRepository'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class OAuthRepositoryMock implements OAuthRepository {
  private mockGetByUid = mockFn()

  private expectedGetByUid: Nullable<OAuthUser>

  async getByUid (uid: string): Promise<Nullable<OAuthUser>> {
    this.mockGetByUid(uid)
    return this.expectedGetByUid
  }

  returnOnGetByUid (oauthUser: Nullable<OAuthUser>): void {
    this.expectedGetByUid = oauthUser
  }

  assertGetByUidHasBeenCalledWith (uid: string) {
    expect(this.mockGetByUid).toHaveBeenCalledWith(uid)
  }
}
