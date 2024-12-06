import { Request, Response, Router } from 'express'
import DI from '@Apps/Auth/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Auth/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Auth.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
