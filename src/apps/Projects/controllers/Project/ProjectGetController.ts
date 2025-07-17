import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { Nullable } from '@Shared/domain/Nullable'
import { FindProjectByIdQuery } from '@Projects/Project/application/FindById/FindProjectByIdQuery'
import { ProjectResponse, ProjectResponseBody } from '@Projects/Project/application/ProjectResponse'
import { FindSpaceByIdQuery } from '@Projects/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Projects/Space/application/SpaceResponse'
import { SpaceMemberResponseBody } from '@Projects/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Projects/User/application/UserResponse'
import { ProjectNotFound } from '@Projects/Project/domain/Errors/ProjectNotFound'

type ProjectGetControllerResponseBody = {
  readonly id: string,
  readonly title: string,
  readonly description: Nullable<string>,
  readonly bannerUrl: Nullable<string>,
  readonly leadUserId: string,
  readonly startDate: Nullable<Date>,
  readonly endDate: Nullable<Date>,
  readonly totalTasks: number,
  readonly communityId: string,
  readonly spaceId: string,
  readonly userId: string,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly deletedAt: Nullable<Date>
}

export class ProjectGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindProjectByIdQuery(req.params.id)

      const project = (await this.queryBus.ask<ProjectResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(project.spaceId)

      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
      let spaceMember: SpaceMemberResponseBody | undefined
      let user: UserResponseBody | undefined

      if (req.headers.authorization) {
        const data = await this.decoder.run(req.headers.authorization)

        user = await this.getUser(data.id, project.communityId)
      }

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user) return res.status(401).send()

        if (!user.isAdmin && !user.isOwner) {
          spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      if (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator) {
        if (!spaceMember) {
          return res.status(200).json(this.getCourseWithoutContent(course) as CourseGetControllerResponseBody)
        }
        const courseUser = await this.getCourseUser(spaceMember.userId, course.id)
        if (!courseUser) {
          return res.status(200).json(this.getCourseWithoutContent(course) as CourseGetControllerResponseBody)
        }
      }

      return res.status(200).json(await this.buildResponse(project, user?.id))
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof ProjectNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private getEventWithoutContent (event: ProjectResponseBody) {
    return {
      ...event,
      data: undefined,
      isLocked: true
    }
  }

  private async buildResponse (project: Partial<ProjectGetControllerResponseBody>) : Promise<ProjectGetControllerResponseBody> {
    return {
      ...project as ProjectGetControllerResponseBody
    }
  }

  private async getProjectUser (userId: string, projectId: string) {
    const query = new FindProjectUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'projectId'],
        ['operator', '='],
        ['value', projectId]
      ])
    ])

    const user = (await this.queryBus.ask<ProjectUserCollectionResponse>(query)).response.pop()

    return user
  }

  private async getLikeId (userId: string, projectId: string) {
    const query = new FindLikesByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'projectId'],
        ['operator', '='],
        ['value', projectId]
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
