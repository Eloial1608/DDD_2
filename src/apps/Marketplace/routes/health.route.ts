import { Request, Response, Router } from 'express'
import DI from '@Apps/Marketplace/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Marketplace/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Marketplace.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
