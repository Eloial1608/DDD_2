import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { DeleteSectionCommand } from '@Course/Section/application/Delete/DeleteSectionCommand'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { SectionResponse } from '@Course/Section/application/SectionResponse'

export class SectionDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const sectionQuery = new FindSectionByIdQuery(req.params.id)

      const section = (await this.queryBus.ask<SectionResponse>(sectionQuery)).response

      const courseQuery = new FindCourseByIdQuery(section.courseId)

      const course = (await this.queryBus.ask<CourseResponse>(courseQuery)).response

      const user = await this.getUser(data.id, course.communityId)

      if (!user) return res.status(401).send()

      if (course.userId !== user.id && !user.isAdmin && !user.isOwner) return res.status(401).send()

      const command = new DeleteSectionCommand(
        req.params.id,
        section.courseId
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()

      return res.status(500).send()
    }
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
