import { Request, Response, Router } from 'express'
import DI from '@Apps/Threads/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Threads/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Threads.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
