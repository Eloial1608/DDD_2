import { ThreadPostController } from '@Apps/Threads/controllers/Thread/ThreadPostController'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { Request, Response, Router } from 'express'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThreadPostController>('Apps.Threads.Controllers.ThreadPostController')
  router.post('/v1/threads/:id', (req: Request, res: Response) => controller.run(req, res))
}
