import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CommentPostController } from '@Apps/Course/controllers/Comment/CommentPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentPostController>('Apps.Course.Controllers.CommentPostController')
  router.post('/v1/comments/:id', (req: Request, res: Response) => controller.run(req, res))
}
