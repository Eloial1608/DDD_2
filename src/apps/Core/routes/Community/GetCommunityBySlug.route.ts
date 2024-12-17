import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityBySlugGetController } from '@Apps/Core/controllers/Community/CommunityBySlugGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityBySlugGetController>('Apps.Core.Controllers.CommunityBySlugGetController')
  router.get('/v1/communities/slug/:slug', (req: Request, res: Response) => controller.run(req, res))
}
