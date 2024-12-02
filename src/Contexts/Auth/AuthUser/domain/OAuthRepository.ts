import { Nullable } from '@Shared/domain/Nullable'

export type OAuthUser = {
    id: string
    email: string
}

export interface OAuthRepository {
    getByUid (uid: string): Promise<Nullable<OAuthUser>>
}
