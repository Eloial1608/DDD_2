import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { LikePostController } from '@Apps/Media/controllers/Like/LikePostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LikePostController>('Apps.Media.Controllers.LikePostController')
  router.post('/v1/likes/:id', (req: Request, res: Response) => controller.run(req, res))
}
