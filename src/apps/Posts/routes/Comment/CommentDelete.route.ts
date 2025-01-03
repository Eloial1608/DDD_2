import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { CommentDeleteController } from '@Apps/Posts/controllers/Comment/CommentDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentDeleteController>('Apps.Posts.Controllers.CommentDeleteController')
  router.delete('/v1/comments/:id', (req: Request, res: Response) => controller.run(req, res))
}
