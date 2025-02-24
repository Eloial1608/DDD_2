import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindSpaceMembersByCriteriaQuery } from '@Course/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Course/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { UserResponseBody } from '@Course/User/application/UserResponse'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMemberResponseBody } from '@Course/SpaceMember/application/SpaceMemberResponse'
import { FindCourseByCriteriaQuery } from '@Course/Course/application/FindByCriteria/FindCourseByCriteriaQuery'
import { CourseCollectionResponse } from '@Course/Course/application/CourseCollectionResponse'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'
import { CourseResponseBody } from '@Course/Course/application/CourseResponse'

type CoursesGetControllerResponseBody = {
  readonly id: string
  readonly communityId: string
  readonly spaceId: string
  readonly userId: string
  readonly author: {
    id: string
    mainId: string
    name: string
    username: string
    bannerUrl: Nullable<string>
    pictureUrl: Nullable<string>
  }
  readonly title: string
  readonly bannerUrl: Nullable<string>
  readonly isPaid: boolean
  readonly price: Nullable<{value: number, currency: string}>
  readonly startDate: Date
  readonly endDate: Nullable<Date>
  readonly maxStudents: Nullable<number>
  readonly totalStudents: number
  readonly totalComments: number
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class CoursesGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  private user: Nullable<UserResponseBody>

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindCourseByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const courses = (await this.queryBus.ask<CourseCollectionResponse>(query)).response

      const coursesToSend = []

      for (const course of courses) {
        const p = await this.filterCourse(course, req.headers.authorization as string)
        if (p) coursesToSend.push(await this.buildResponse(course, this.user?.id))
      }

      return res.status(200).json(courses)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof CourseNotFound) return res.status(404).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private async filterCourse (course: CourseResponseBody, token: string) {
    const spaceQuery = new FindSpaceByIdQuery(course.spaceId)

    const space = await (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
    let spaceMember: SpaceMemberResponseBody | undefined

    if (this.user === undefined && token) {
      const data = await this.decoder.run(token)

      const user = await this.getUser(data.id, course.communityId)

      this.user = user ?? null
    }

    if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
      if (!this.user) return null

      if (!this.user.isAdmin && !this.user.isOwner) {
        spaceMember = await this.getSpaceMember(this.user.id, this.user.communityId, space.id)

        if (!spaceMember) return null
      }
    }

    return course
  }

  private async buildResponse (course: Partial<CoursesGetControllerResponseBody>, userId?: string) : Promise<CoursesGetControllerResponseBody> {
    return {
      ...course as CoursesGetControllerResponseBody
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
