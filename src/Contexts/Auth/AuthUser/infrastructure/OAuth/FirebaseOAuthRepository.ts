import { OAuthUser } from '@Auth/AuthUser/domain/OAuthRepository'
import { FirebaseRepository } from '@Auth/Shared/infrastructure/Persistence/Firebase/FirebaseRepository'
import { Nullable } from '@Shared/domain/Nullable'

export class FirebaseOAuthRepository extends FirebaseRepository {
  async getByUid (uid: string): Promise<Nullable<OAuthUser>> {
    const user = await (await this.auth()).getUser(uid)

    return {
      id: user.uid,
      email: user.email!
    }
  }
}
