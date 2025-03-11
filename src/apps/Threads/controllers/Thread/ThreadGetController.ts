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
import { UserCollectionResponse } from "@Threads/User/application/UserCollectionResponse"
import { FindUsersByCriteriaQuery } from "@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery"
import { SpaceMemberCollectionResponse } from "@Threads/SpaceMember/application/SpaceMemberCollectionResponse"
import { FindSpaceMembersByCriteriaQuery } from "@Threads/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery"

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

       private getThreadWithoutContent (thread: ThreadResponseBody) {
         const { content, ...data } = thread
     
         return {
           ...data,
           isLocked: true
         }
       }
     
       private async buildResponse (thread: Partial<ThreadsGetControllerResponseBody>, userId?: string) : Promise<ThreadsGetControllerResponseBody> {
         return {
           ...thread as ThreadsGetControllerResponseBody,
           likeId: userId ? (await this.getLikeId(userId, thread.id!))?.id : undefined
         }
       }
     
       private async getThreadUser (userId: string, threadId: string) {
         const query = new FindThreadUsersByCriteriaQuery([
           new Map<string, string>([
             ['field', 'userId'],
             ['operator', '='],
             ['value', userId]
           ]),
           new Map<string, string>([
             ['field', 'threadId'],
             ['operator', '='],
             ['value', threadId]
           ])
         ])
     
         const user = (await this.queryBus.ask<ThreadUserCollectionResponse>(query)).response.pop()
     
         return user
       }
     
       private async getLikeId (userId: string, threadId: string) {
         const query = new FindLikesByCriteriaQuery([
           new Map<string, string>([
             ['field', 'userId'],
             ['operator', '='],
             ['value', userId]
           ]),
           new Map<string, string>([
             ['field', 'threadId'],
             ['operator', '='],
             ['value', threadId]
           ])
         ])
     
         const user = (await this.queryBus.ask<LikeCollectionResponse>(query)).response.pop()
     
         return user
       }
     
       private async getSpaceMember (userId: string, communityId: string, spaceId: string) {
         const query = new FindSpaceMembersByCriteriaQuery([
           new Map<string, string>([
             ['field', 'userId'],
             ['operator', '='],
             ['value', userId]
           ]),
           new Map<string, string>([
             ['field', 'spaceId'],
             ['operator', '='],
             ['value', spaceId]
           ]),
           new Map<string, string>([
             ['field', 'communityId'],
             ['operator', '='],
             ['value', communityId]
           ])
         ])
     
         return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response.pop()
       }
     
       private async getUser (id: string, communityId: string) {
         const query = new FindUsersByCriteriaQuery([
           new Map<string, string>([
             ['field', 'mainId'],
             ['operator', '='],
             ['value', id]
           ]),
           new Map<string, string>([
             ['field', 'communityId'],
             ['operator', '='],
             ['value', communityId]
           ])
         ])
     
         const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()
     
         return user
       }
}