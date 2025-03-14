import { Request, Response, Router } from 'express'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { LikeDeleteController } from '@Apps/Threads/controllers/Like/LikeDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LikeDeleteController>('Apps.Threads.Controllers.LikeDeleteController')
  router.delete('/v1/likes/:id', (req: Request, res: Response) => controller.run(req, res))
}
