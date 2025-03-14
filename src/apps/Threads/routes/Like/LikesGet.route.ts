import { Request, Response, Router } from 'express'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { LikesGetController } from '@Apps/Threads/controllers/Like/LikesGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LikesGetController>('Apps.Threads.Controllers.LikesGetController')
  router.get('/v1/likes', (req: Request, res: Response) => controller.run(req, res))
}
