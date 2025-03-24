import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { DeleteCommentCommand } from '@Course/Comment/application/Delete/DeleteCommentCommand'
import { CommentResponse } from '@Course/Comment/application/CommentResponse'
import { FindCommentByIdQuery } from '@Course/Comment/application/FindById/FindCommentByIdQuery'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'

export class CommentDeleteController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const comment = await this.getComment(req.params.id)

      const course = await this.getCourse(comment.courseId)

      const user = await this.getUser(data.id, course.communityId)

      if (!user) return res.status(401).send()

      const command = new DeleteCommentCommand(req.params.id, user.id)

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof CourseNotFound) return res.status(404).send(e.getMessage())

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

  private async getComment (commentId: string) {
    const query = new FindCommentByIdQuery(commentId)

    const comment = (await this.queryBus.ask<CommentResponse>(query)).response

    return comment
  }

  private async getCourse (courseId: string) {
    const query = new FindCourseByIdQuery(courseId)

    const course = (await this.queryBus.ask<CourseResponse>(query)).response

    return course
  }
}
