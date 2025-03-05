import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { LikeDeleteController } from '@Apps/Media/controllers/Like/LikeDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LikeDeleteController>('Apps.Media.Controllers.LikeDeleteController')
  router.delete('/v1/likes/:id', (req: Request, res: Response) => controller.run(req, res))
}
