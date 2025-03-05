import { CommandBus } from "@Shared/domain/CommandBus/CommandBus";
import { Controller } from "../@types/Controller";
import { QueryBus } from "@Shared/domain/QueryBus/QueryBus";
import { TokenDecoder } from "@Shared/domain/TokenDecoder/TokenDecoder";
import { Request, Response } from "express";
import { UserCollectionResponse } from "@Threads/User/application/UserCollectionResponse";
import { FindUsersByCriteriaQuery } from "@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery";
import { SpaceMemberCollectionResponse } from "@Threads/SpaceMember/application/SpaceMemberCollectionResponse";
import { FindSpaceMembersByCriteriaQuery } from "@Threads/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery";
import { CannotDecode } from "@Shared/domain/TokenDecoder/Errors/CannotDecode";

export class ThreadDeleteController implements Controller{
    constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder){}

    async run( req: Request, res: Response): Promise<Response>{
      try{
        if (!req.headers.authorization) return res.status(401).send()

        const data = await this.decoder.run(req.headers.authorization)

        return res.status(204).send()
      } catch (e) {
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