import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { LikesGetController } from '@Apps/Media/controllers/Like/LikesGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LikesGetController>('Apps.Media.Controllers.LikesGetController')
  router.get('/v1/likes', (req: Request, res: Response) => controller.run(req, res))
}
