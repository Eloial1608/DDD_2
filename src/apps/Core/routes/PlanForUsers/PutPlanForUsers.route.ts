import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { PlanForUsersPutController } from '@Apps/Core/controllers/PlanForUsers/PlanForUsersPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PlanForUsersPutController>('Apps.Core.Controllers.PlanForUsersPutController')
  router.put('/v1/plan-for-users/:id', (req: Request, res: Response) => controller.run(req, res))
}
