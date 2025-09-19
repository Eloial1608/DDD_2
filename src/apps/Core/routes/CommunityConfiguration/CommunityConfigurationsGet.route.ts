import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityConfigurationsGetController } from '@Apps/Core/controllers/CommunityConfiguration/CommunityConfigurationsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityConfigurationsGetController>('Apps.Core.Controllers.CommunityConfigurationsGetController')
  router.get('/v1/communityConfiguration', (req: Request, res: Response) => controller.run(req, res))
}
