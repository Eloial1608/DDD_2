import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPlanByUserIdGetController } from '@Apps/Core/controllers/UserPlan/UserPlanByUserIdGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserPlanByUserIdGetController>('Apps.Core.Controllers.UserPlanByUserIdGetController')
  router.get('/v1/user/plan/:id', (req: Request, res: Response) => controller.run(req, res))
}
