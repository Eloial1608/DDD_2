import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityConfigurationGetController } from '@Apps/Core/controllers/CommunityConfiguration/CommunityConfigurationGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityConfigurationGetController>('Apps.Core.Controllers.CommunityConfigurationGetController')
  router.get('/v1/communityConfiguration/:id', (req: Request, res: Response) => controller.run(req, res))
}
