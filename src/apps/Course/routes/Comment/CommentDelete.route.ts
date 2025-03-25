import { Request, Response, Router } from 'express'
import DI from '@Apps/Course/dependencyInjection/DI'
import { CommentDeleteController } from '@Apps/Course/controllers/Comment/CommentDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentDeleteController>('Apps.Course.Controllers.CommentDeleteController')
  router.delete('/v1/comments/:id', (req: Request, res: Response) => controller.run(req, res))
}
