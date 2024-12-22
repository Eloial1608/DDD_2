import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { PlanForUsersPostController } from '@Apps/Core/controllers/PlanForUsers/PlanForUsersPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PlanForUsersPostController>('Apps.Core.Controllers.PlanForUsersPostController')
  router.post('/v1/plan-for-users/:id', (req: Request, res: Response) => controller.run(req, res))
}
