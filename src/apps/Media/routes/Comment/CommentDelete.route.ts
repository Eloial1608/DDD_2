import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { CommentDeleteController } from '@Apps/Media/controllers/Comment/CommentDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentDeleteController>('Apps.Media.Controllers.CommentDeleteController')
  router.delete('/v1/comments/:id', (req: Request, res: Response) => controller.run(req, res))
}
