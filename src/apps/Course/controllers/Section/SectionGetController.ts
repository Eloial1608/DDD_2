import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { SectionResponse } from '@Course/Section/application/SectionResponse'
import { SectionNotFound } from '@Course/Section/domain/Errors/SectionNotFound'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse, CourseResponseBody } from '@Course/Course/application/CourseResponse'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { SpaceMemberResponseBody } from '@Course/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Course/User/application/UserResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Course/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Course/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { FindCourseUsersByCriteriaQuery } from '@Course/CourseUser/application/FindByCriteria/FindCourseUsersByCriteriaQuery'
import { CourseUserCollectionResponse } from '@Course/CourseUser/application/CourseUserCollectionResponse'

export class SectionGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      await this.decoder.run(req.headers.authorization)

      const query = new FindSectionByIdQuery(req.params.id)

      const section = (await this.queryBus.ask<SectionResponse>(query)).response

      const courseQuery = new FindCourseByIdQuery(req.params.courseId)

      const course = (await this.queryBus.ask<CourseResponse>(courseQuery)).response

      const canAccess = await this.canAccess(course, req.headers.authorization as string)

      if (!canAccess) return res.status(401).send()

      return res.status(200).json(section)
    } catch (e) {
      console.log(e)
      if (e instanceof SectionNotFound) return res.status(404).json({ message: e.getMessage() })

      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async canAccess (course: CourseResponseBody, token: string): Promise<boolean> {
    const spaceQuery = new FindSpaceByIdQuery(course.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined
    let user: UserResponseBody | undefined

    if (user == null && token) {
      const data = await this.decoder.run(token)

      const u = await this.getUser(data.id, course.communityId)

      user = u ?? undefined
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!user) return false

      if (!user.isAdmin && !user.isOwner) {
        spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

        if (!spaceMember) return false
      }
    }

    if (course.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
      if (!spaceMember) return false
      const courseUser = await this.getCourseUser(spaceMember.userId, course.id)
      if (!courseUser) return false
    }

    return true
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

  private async getCourseUser (userId: string, courseId: string) {
    const query = new FindCourseUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'postId'],
        ['operator', '='],
        ['value', courseId]
      ])
    ])

    const courseUser = (await this.queryBus.ask<CourseUserCollectionResponse>(query)).response.pop()

    return courseUser
  }
}
