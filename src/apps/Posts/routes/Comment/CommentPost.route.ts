import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { CommentPostController } from '@Apps/Posts/controllers/Comment/CommentPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentPostController>('Apps.Posts.Controllers.CommentPostController')
  router.post('/v1/comments/:id', (req: Request, res: Response) => controller.run(req, res))
}
