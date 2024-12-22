import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { PlanForUsersDeleteController } from '@Apps/Core/controllers/PlanForUsers/PlanForUsersDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PlanForUsersDeleteController>('Apps.Core.Controllers.PlanForUsersDeleteController')
  router.delete('/v1/plan-for-users/:id', (req: Request, res: Response) => controller.run(req, res))
}
