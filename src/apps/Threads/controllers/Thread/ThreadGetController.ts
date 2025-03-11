import { Nullable } from "@Shared/domain/Nullable"
import { Controller } from "../@types/Controller"
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus"
import { TokenDecoder } from "@Shared/domain/TokenDecoder/TokenDecoder"
import { Response, Request } from "express"
import { FindThreadByIdQuery } from "@Threads/Thread/application/FindById/FindThreadByIdQuery"
import { ThreadResponse } from "@Threads/Thread/application/ThreadResponse"
import { SpaceResponse } from "@Threads/Space/application/SpaceResponse"
import { SpaceMemberResponseBody } from "@Threads/SpaceMember/application/SpaceMemberResponse"
import { UserResponseBody } from "@Threads/User/application/UserResponse"
import { FindSpaceByIdQuery } from "@Threads/Space/application/FindById/FindSpaceByIdQuery"

type ThreadsGetControllerResponseBody = {
  readonly id: string
  readonly communityId: string
  readonly userId: string
  readonly title: string
  readonly parentThreadId: Nullable<string>
  readonly content: Nullable<string>
  readonly likeId: Nullable<string>
  readonly bannerUrl: Nullable<string>
  readonly spaceId: string
  readonly author: {
    id: string
    mainId: string
    name: string
    username: string
    bannerUrl: Nullable<string>
    pictureUrl: Nullable<string>
  }
  readonly isPaid: boolean
  totalLikes: number
  readonly isLocked?: boolean
  totalThreads: number
  readonly price: Nullable<{value: number, currency: string}>
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class ThreadGetController implements Controller{
     constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

     async run (req: Request, res: Response): Promise<Response>{
        try{
            const query = new FindThreadByIdQuery(req.params.id)

            const thread = (await this.queryBus.ask<ThreadResponse>(query)).response

            const spaceQuery = new FindSpaceByIdQuery(thread.spaceId)

             const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
                  let spaceMember: SpaceMemberResponseBody | undefined
                  let user: UserResponseBody | undefined
        }
     }
}