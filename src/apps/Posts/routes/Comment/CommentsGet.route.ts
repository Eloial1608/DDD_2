import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { CommentsGetController } from '@Apps/Posts/controllers/Comment/CommentsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentsGetController>('Apps.Posts.Controllers.CommentsGetController')
  router.get('/v1/comments', (req: Request, res: Response) => controller.run(req, res))
}
