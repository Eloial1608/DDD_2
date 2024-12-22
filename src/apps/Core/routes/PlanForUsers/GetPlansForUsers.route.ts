import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { PlansForUsersGetController } from '@Apps/Core/controllers/PlanForUsers/PlansForUsersGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PlansForUsersGetController>('Apps.Core.Controllers.PlansForUsersGetController')
  router.get('/v1/plan-for-users', (req: Request, res: Response) => controller.run(req, res))
}
