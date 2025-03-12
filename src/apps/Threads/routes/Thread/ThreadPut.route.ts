import { Request, Response, Router } from 'express'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { ThreadPutController } from '@Apps/Threads/controllers/Thread/ThreadPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThreadPutController>('Apps.Threads.Controllers.ThreadPutController')
  router.put('/v1/threads/:id', (req: Request, res: Response) => controller.run(req, res))
}
