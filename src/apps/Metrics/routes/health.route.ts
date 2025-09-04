import { Request, Response, Router } from 'express'
import DI from '@Apps/Metrics/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Metrics/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Metrics.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
