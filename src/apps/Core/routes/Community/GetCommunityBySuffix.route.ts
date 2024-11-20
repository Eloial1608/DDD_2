import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityBySuffixGetController } from '@Apps/Core/controllers/Community/CommunityBySuffixGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityBySuffixGetController>('Apps.Core.Controllers.CommunityBySuffixGetController')
  router.get('/v1/communities/suffix/:suffix', (req: Request, res: Response) => controller.run(req, res))
}
