import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { CommandBus } from '@Shared/domain/CommandBus/CommandBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CreateCommentCommand } from '@Posts/Comment/application/Create/CreateCommentCommand'
import { PostNotFound } from '@Posts/Post/domain/Errors/PostNotFound'
import { CommentNotFound } from '@Posts/Comment/domain/Errors/CommentNotFound'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindCommentByIdQuery } from '@Posts/Comment/application/FindById/FindCommentByIdQuery'
import { CommentResponse } from '@Posts/Comment/application/CommentResponse'
import { FindPostByIdQuery } from '@Posts/Post/application/FindById/FindPostByIdQuery'
import { PostResponse } from '@Posts/Post/application/PostResponse'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'

export class CommentPostController implements Controller {
  constructor (private readonly commandBus: CommandBus, private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const comment = await this.getComment(req.params.id)

      const post = await this.getPost(comment.postId)

      const user = await this.getUser(data.id, post.communityId)

      if (!user) return res.status(401).send()

      const command = new CreateCommentCommand(
        req.params.id,
        post.id,
        user.id,
        req.body.content
      )

      await this.commandBus.dispatch(command)

      return res.status(204).send()
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send()
      if (e instanceof PostNotFound) return res.status(404).send(e.getMessage())
      if (e instanceof CommentNotFound) return res.status(404).send(e.getMessage())

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

  private async getPost (postId: string) {
    const query = new FindPostByIdQuery(postId)

    const post = (await this.queryBus.ask<PostResponse>(query)).response

    return post
  }
}
