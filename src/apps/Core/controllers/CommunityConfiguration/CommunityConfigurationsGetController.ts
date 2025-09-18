// import { Request, Response } from 'express'
// import { Controller } from '../@types/Controller'
// import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
// import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
// import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
// import { CommunityConfigurationResponseBody } from '@Core/CommunityConfiguration/application/CommunityConfigurationResponse'
// import { CommunityConfigurationNotFound } from '@Core/CommunityConfiguration/domain/Errors/CommunityConfigurationNotFound'
// import { FindCommunityConfigurationsByCriteriaQuery } from '@Core/CommunityConfiguration/application/FindByCriteria/FindCommunityConfigurationsByCriteriaQuery'
// import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
// import { CommunityConfigurationCollectionResponse } from '@Core/CommunityConfiguration/application/CommunityConfigurationCollectionResponse'

// export class CommunityConfigurationsGetController implements Controller {
//   constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

//   async run (req: Request, res: Response): Promise<Response> {
//     try {
//       const criteria = buildCriteriaFromUri(req.query.criteria as string)

//       const query = new FindCommunityConfigurationsByCriteriaQuery(
//         criteria.filters,
//         criteria.inFilters,
//         criteria.orderBy,
//         criteria.orderType,
//         criteria.limit,
//         criteria.offset
//       )

//       const communityconfigurations = (await this.queryBus.ask<CommunityConfigurationCollectionResponse>(query)).response

//       const communityconfigurationToSend = []

//       for (const communityconfiguration of communityconfigurations) {
//         const p = await this.filterCommunityConfiguration(communityconfiguration, req.headers.authorization as string)
//         if (p) communityconfigurationToSend.push(p)
//       }

//       return res.status(200).json(communityconfigurationToSend)
//     } catch (e) {
//       console.log(e)
//       if (e instanceof CannotDecode) return res.status(401).send()
//       if (e instanceof CommunityConfigurationNotFound) return res.status(404).send(e.getMessage())

//       return res.status(500).send()
//     }
//   }

//   private async filterCommunityConfiguration (communityconfiguration: CommunityConfigurationResponseBody, token: string) {
//     if (communityconfiguration.communityId == null) return communityconfiguration

//     if (!token) return

//     const data = await this.decoder.run(token)

//     if (data.communityId !== communityconfiguration.communityId) return

//     return communityconfiguration
//   }
// }
