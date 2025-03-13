import { Request, Response, Router } from 'express'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { ThreadGetController } from '@Apps/Threads/controllers/Thread/ThreadGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThreadGetController>('Apps.Threads.Controllers.ThreadGetController')
  router.get('/v1/threads/:id', (req: Request, res: Response) => controller.run(req, res))
}
