import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { AuthUser } from './AuthUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { CommunityId } from './ValueObjects/CommunityId'
import { Method } from './ValueObjects/Method'
import { Secret } from './ValueObjects/Secret'

export interface AuthUserRepository {
    find (id: Id): Promise<Nullable<AuthUser>>
    findByCommunityMethodAndSecret (communityId: CommunityId, method: Method, secret: Secret): Promise<Nullable<AuthUser>>
    search (criteria: Criteria): Promise<Array<AuthUser>>
    persist (community: AuthUser): Promise<void>
}
