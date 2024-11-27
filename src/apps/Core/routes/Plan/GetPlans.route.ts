import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { PlansGetController } from '@Apps/Core/controllers/Plan/PlansGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PlansGetController>('Apps.Core.Controllers.PlansGetController')
  router.get('/v1/plans', (req: Request, res: Response) => controller.run(req, res))
}
