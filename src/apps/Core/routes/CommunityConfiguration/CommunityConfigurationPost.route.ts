import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityConfigurationPostController } from '@Apps/Core/controllers/CommunityConfiguration/CommunityConfigurationPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityConfigurationPostController>('Apps.Core.Controllers.CommunityConfigurationPostController')
  router.post('/v1/communityConfiguration/:id', (req: Request, res: Response) => controller.run(req, res))
}
