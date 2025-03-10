import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { CommentsGetController } from '@Apps/Media/controllers/Comment/CommentsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommentsGetController>('Apps.Media.Controllers.CommentsGetController')
  router.get('/v1/comments', (req: Request, res: Response) => controller.run(req, res))
}
