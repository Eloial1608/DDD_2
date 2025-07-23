import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunitySpaceOrderedIdsPatchController } from '@Apps/Core/controllers/Community/CommunitySpaceOrderedIdsPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunitySpaceOrderedIdsPatchController>('Apps.Core.Controllers.CommunitySpaceOrderedIdsPatchController')
  router.patch('/v1/communities/space-ordered-ids/:id', (req: Request, res: Response) => controller.run(req, res))
}
