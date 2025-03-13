import { Request, Response, Router } from 'express'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { ThreadsGetController } from '@Apps/Threads/controllers/Thread/ThreadsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThreadsGetController>('Apps.Threads.Controllers.ThreadsGetController')
  router.get('/v1/threads', (req: Request, res: Response) => controller.run(req, res))
}
