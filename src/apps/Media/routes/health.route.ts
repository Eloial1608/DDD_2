import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Media/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Media.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
