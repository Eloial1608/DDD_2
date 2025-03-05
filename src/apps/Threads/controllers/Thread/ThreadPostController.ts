import { Controller } from "@Apps/Auth/controllers/@types/Controller";
import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus";
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode";
import { TokenDecoder } from "@Shared/domain/TokenDecoder/TokenDecoder";
import { FindSpaceMembersByCriteriaQuery } from "@Threads/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery";
import { SpaceMemberCollectionResponse } from "@Threads/SpaceMember/application/SpaceMemberCollectionResponse";
import { CreateThreadCommand } from "@Threads/Thread/application/Create/CreateThreadCommand";
import { FindUsersByCriteriaQuery } from "@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery";
import { UserCollectionResponse } from "@Threads/User/application/UserCollectionResponse";
import { Request, Response } from "express";

export class ThreadPostController implements Controller{
    constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder:TokenDecoder){}
    
    async run( req: Request, res: Response): Promise<Response>{
        try{
            if(!req.headers.authorization) return res.status(401).send()

            const data = await this.decoder.run(req.headers.authorization)

            const user = await this.getUser(data.id,req.body.communityId)

            if(!user) return res.status(401).send()

            if(!user.isAdmin && !user.isOwner){
                const spaceMember = await this.getSpaceMember(user.id, user.communityId, req.body.spaceId)

                if (!spaceMember) return res.status(401).send()
            }

            const command = new CreateThreadCommand(
                req.params.id,
                user.communityId,
                req.body.spaceId,
                req.body.title,
                req.body.parentThreadId,
                user.id,
                req.body.content,
                req.body.bannerUrl,
                req.body.isPaid,
                req.body.price
            )

            await this.commandBus.dispatch(command)

            return res.status(201).send()
        } catch(e){
             console.log(e)
                  if (e instanceof CannotDecode) return res.status(401).send()
            
                  return res.status(500).send()
        }
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
    
        return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response
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