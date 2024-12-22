import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { PlanForUsersGetController } from '@Apps/Core/controllers/PlanForUsers/PlanForUsersGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PlanForUsersGetController>('Apps.Core.Controllers.PlanForUsersGetController')
  router.get('/v1/plan-for-users/:id', (req: Request, res: Response) => controller.run(req, res))
}
