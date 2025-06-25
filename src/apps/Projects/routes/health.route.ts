import { Request, Response, Router } from 'express'
import DI from '@Apps/Projects/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Projects/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Projects.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
