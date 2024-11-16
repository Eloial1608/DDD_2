import { Nullable } from "@Shared/domain/Nullable";
import { Id } from "./ValueObjects/Id";
import { Community } from "./Community";
import { Criteria } from "@Shared/domain/Criteria/Criteria";

export interface CommunityRepository {
    find (id: Id): Promise<Nullable<Community>>
    search (criteria: Criteria): Promise<Array<Community>>
    persist (community: Community): Promise<void>
}