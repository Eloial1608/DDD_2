import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { CommunityConfiguration } from './CommunityConfiguration'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface CommunityConfigurationRepository{
        find (id: Id): Promise<Nullable<CommunityConfiguration>>
        search (criteria: Criteria): Promise<Array<CommunityConfiguration>>
        persist (communityconfiguration: CommunityConfiguration): Promise<void>
}
