import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { CommentPutController } from '@Apps/Media/controllers/Comment/CommentPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentPutController>('Apps.Media.Controllers.CommentPutController')
  router.put('/v1/comments/:id', (req: Request, res: Response) => controller.run(req, res))
}
