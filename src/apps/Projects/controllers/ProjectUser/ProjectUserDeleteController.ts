// import { Request, Response } from 'express'
// import { Controller } from '../@types/Controller'
// import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
// import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
// import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
// import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
// import { DeleteProjectUserCommand } from '@Projects/ProjectUser/application/Delete/DeleteProjectUserCommand'
// import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
// import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
// import { FindProjectUsersByCriteriaQuery } from '@Projects/ProjectUser/application/FindByCriteria/FindProjectUsersByCriteriaQuery'
// import { ProjectUserResponse } from '@Projects/ProjectUser/application/ProjectUserResponse'

// export class ProjectUserDeleteController implements Controller {
//   constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

//   async run (req: Request, res: Response): Promise<Response> {
//     try {
//       if (!req.headers.authorization) return res.status(401).send()

//       const data = await this.decoder.run(req.headers.authorization)

//       const project = await this.getProject(req.params.projectId)

//       const user = await this.getUser(data.id, project.communityId)

//       if (!user) return res.status(401).send()

//       const projectUser = await this.getProjectUser(user.id, project.id)

//       if (!user.isAdmin && !user.isOwner && user.id !== projectUser.userId)

//       const command = new DeleteProjectUserCommand(projectUser.id)

//       await this.commandBus.dispatch(command)

//       return res.status(204).send()
//     } catch (e) {
//       if (e instanceof CannotDecode) return res.status(401).send()
//       if (e instanceof ProjectNotFound) return res.status(404).send(e.getMessage())

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

//   private async getProjectUser (userId: string, projectId: string) {
//     const query = new FindProjectUsersByCriteriaQuery([
//       new Map<string, string>([
//         ['field', 'userId'],
//         ['operator', '='],
//         ['value', userId]
//       ]),
//       new Map<string, string>([
//         ['field', 'projectId'],
//         ['operator', '='],
//         ['value', projectId]
//       ])
//     ])

//     const projectUser = (await this.queryBus.ask<ProjectUserResponse>(query)).response

//     return projectUser
//   }

//   private async getProject (postId: string) {
//     const query = new FindProjectByIdQuery(postId)

//     const post = (await this.queryBus.ask<ProjectResponse>(query)).response

//     return post
//   }
// }
