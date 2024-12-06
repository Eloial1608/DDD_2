import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Core/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Core.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
