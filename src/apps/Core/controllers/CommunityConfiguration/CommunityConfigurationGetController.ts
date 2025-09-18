// import { Request, Response } from 'express'
// import { Controller } from '../@types/Controller'
// import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
// import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
// import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
// import { FindCommunityConfigurationByIdQuery } from '@Core/CommunityConfiguration/application/FindById/FindCommunityConfigurationByIdQuery'
// import { CommunityConfigurationResponse } from '@Core/CommunityConfiguration/application/CommunityConfigurationResponse'
// import { CommunityConfigurationNotFound } from '@Core/CommunityConfiguration/domain/Errors/CommunityConfigurationNotFound'

// export class CommunityConfigurationGetController implements Controller {
//   constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

//   async run (req: Request, res: Response): Promise<Response> {
//     try {
//       const query = new FindCommunityConfigurationByIdQuery(req.params.id)

//       const communityconfiguration = (await this.queryBus.ask<CommunityConfigurationResponse>(query)).response

//       if (communityconfiguration.communityId) {
//         if (req.headers.authorization) {
//           const data = await this.decoder.run(req.headers.authorization)

//           if (data.communityId !== communityconfiguration.communityId) {
//             return res.status(403).send()
//           }
//         }
//       }

//       return res.status(200).json(communityconfiguration)
//     } catch (e) {
//       console.log(e)
//       if (e instanceof CannotDecode) return res.status(401).send()
//       if (e instanceof CommunityConfigurationNotFound) return res.status(404).send(e.getMessage())

//       return res.status(500).send()
//     }
//   }
// }
