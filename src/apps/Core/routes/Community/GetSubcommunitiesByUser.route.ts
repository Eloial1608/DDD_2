import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SubcommunityByUserGetController } from '@Apps/Core/controllers/Community/SubcommunityByUserGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SubcommunityByUserGetController>('Apps.Core.Controllers.SubcommunityByUserGetController')
  router.get('/v1/communities/sub/user/communityId/:id', (req: Request, res: Response) => controller.run(req, res))
}
