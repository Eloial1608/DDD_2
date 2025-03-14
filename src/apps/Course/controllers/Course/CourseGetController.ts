import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CourseResponse, CourseResponseBody } from '@Course/Course/application/CourseResponse'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'
import { Nullable } from '@Shared/domain/Nullable'
import { FindCourseUsersByCriteriaQuery } from '@Course/CourseUser/application/FindByCriteria/FindCourseUsersByCriteriaQuery'
import { CourseUserCollectionResponse } from '@Course/CourseUser/application/CourseUserCollectionResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Course/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { SpaceMemberResponseBody } from '@Course/SpaceMember/application/SpaceMemberResponse'
import { UserResponseBody } from '@Course/User/application/UserResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'

type CourseGetControllerResponseBody = {
  readonly id: string,
  readonly communityId: string,
  readonly spaceId: string,
  readonly userId: string,
  readonly author: {
    id: string
    mainId: string
    name: string
    username: string
    bannerUrl: Nullable<string>
    pictureUrl: Nullable<string>
  }
  readonly title: string,
  readonly bannerUrl: Nullable<string>,
  readonly isPaid: boolean,
  readonly price: Nullable<{value: number, currency: string}>
  readonly startDate: Date,
  readonly endDate: Nullable<Date>,
  readonly maxStudents: Nullable<number>,
  readonly totalStudents: number,
  readonly totalComments: number,
  isLocked: boolean,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly deletedAt: Nullable<Date>
}

export class CourseGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindCourseByIdQuery(req.params.id)

      const course = (await this.queryBus.ask<CourseResponse>(query)).response

      const spaceQuery = new FindSpaceByIdQuery(course.spaceId)

      const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
      let spaceMember: SpaceMemberResponseBody | undefined
      let user: UserResponseBody | undefined

      if (req.headers.authorization) {
        const data = await this.decoder.run(req.headers.authorization)

        user = await this.getUser(data.id, course.communityId)
      }

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (!user) return res.status(401).send()

        if (!user.isAdmin && !user.isOwner) {
          spaceMember = await this.getSpaceMember(user.id, user.communityId, space.id)

          if (!spaceMember) return res.status(401).send()
        }
      }

      if (course.isPaid && (!user?.isAdmin && !user?.isOwner && !spaceMember?.isModerator)) {
        if (!spaceMember) {
          return res.status(200).json(this.getCourseWithoutContent(course) as CourseGetControllerResponseBody)
        }
        const courseUser = await this.getCourseUser(spaceMember.userId, course.id)
        if (!courseUser) {
          return res.status(200).json(this.getCourseWithoutContent(course) as CourseGetControllerResponseBody)
        }
      }

      return res.status(200).json(course as CourseGetControllerResponseBody)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof CourseNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private getCourseWithoutContent (course: CourseResponseBody) {
    return {
      ...course,
      isLocked: true
    }
  }

  private async getCourseUser (userId: string, courseId: string) {
    const query = new FindCourseUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'courseId'],
        ['operator', '='],
        ['value', courseId]
      ])
    ])

    const user = (await this.queryBus.ask<CourseUserCollectionResponse>(query)).response.pop()

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
