import { Request, Response, Router } from 'express'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { ThreadDeleteController } from '@Apps/Threads/controllers/Thread/ThreadDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ThreadDeleteController>('Apps.Threads.Controllers.ThreadDeleteController')
  router.delete('/v1/threads/:id', (req: Request, res: Response) => controller.run(req, res))
}
