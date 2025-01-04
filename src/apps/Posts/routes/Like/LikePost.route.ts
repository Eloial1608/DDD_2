import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { LikePostController } from '@Apps/Posts/controllers/Like/LikePostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LikePostController>('Apps.Posts.Controllers.LikePostController')
  router.post('/v1/likes/:id', (req: Request, res: Response) => controller.run(req, res))
}
