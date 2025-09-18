// import { Request, Response } from 'express'
// import { Controller } from '../@types/Controller'
// import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
// import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
// import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
// import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
// import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
// import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
// import { DeleteCommunityConfigurationCommand } from '@Core/CommunityConfiguration/application/Delete/DeleteCommunityConfigurationCommand'
// import { FindCommunityConfigurationByIdQuery } from '@Core/CommunityConfiguration/application/FindById/FindCommunityConfigurationByIdQuery'
// import { CommunityConfigurationResponse } from '@Core/CommunityConfiguration/application/CommunityConfigurationResponse'

// export class CommunityConfigurationDeleteController implements Controller {
//   constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

//   async run (req: Request, res: Response): Promise<Response> {
//     try {
//       if (!req.headers.authorization) return res.status(401).send()

//       const data = await this.decoder.run(req.headers.authorization)

//       const communityconfigurationQuery = new FindCommunityConfigurationByIdQuery(req.params.id)

//       const communityconfiguration = (await this.queryBus.ask<CommunityConfigurationResponse>(communityconfigurationQuery)).response

//       if (communityconfiguration.communityId == null) return res.status(401).send()

//       const user = await this.getUser(data.id, communityconfiguration.communityId)

//       if (!user) return res.status(401).send()

//       if (!user.isAdmin && !user.isOwner) return res.status(401).send()

//       const command = new DeleteCommunityConfigurationCommand(
//         req.params.id,
//         user.communityId
//       )

//       await this.commandBus.dispatch(command)

//       return res.status(204).send()
//     } catch (e) {
//       if (e instanceof CannotDecode) return res.status(401).send()

//       return res.status(500).send()
//     }
//   }

//   private async getUser (id: string, communityId: string) {
//     const query = new FindUsersByCriteriaQuery([
//       new Map<string, string>([
//         ['field', 'mainId'],
//         ['operator', '='],
//         ['value', id]
//       ]),
//       new Map<string, string>([
//         ['field', 'communityId'],
//         ['operator', '='],
//         ['value', communityId]
//       ])
//     ])

//     const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

//     return user
//   }
// }
