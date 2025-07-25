import { Nullable } from "@Shared/domain/Nullable"

export type StatusResponseBody = {
    readonly id: String,
    readonly title: string,
    readonly description: Nullable<string>,
    readonly order: number,
    readonly color: string,
    readonly projectId: string,
    readonly communityId: string,
    readonly createdAt: string, 
    readonly updatedAt: string,
    readonly deletedAt: Nullable<string>
    }

export class StatusResponse {
    response: StatusResponseBody

    constructor(status: any) {
        this.response = {
            id: status.id.valueOf(),
            title: status.title.valueOf(),
            description: status.description?.valueOf(),
            order: status.order.valueOf(),
            color: status.color.valueOf()    ,
            projectId: status.projectId.valueOf(),
            communityId: status.communityId.valueOf(),
            createdAt: status.createdAt.valueOf(),
            updatedAt: status.updatedAt.valueOf(),
            deletedAt: status.deletedAt?.valueOf()
        }
    }
}