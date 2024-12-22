import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPlanGetController } from '@Apps/Core/controllers/UserPlan/UserPlanGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserPlanGetController>('Apps.Core.Controllers.UserPlanGetController')
  router.get('/v1/me/plan/:communityId', (req: Request, res: Response) => controller.run(req, res))
}
