import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityConfigurationDeleteController } from '@Apps/Core/controllers/CommunityConfiguration/CommunityConfigurationDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityConfigurationDeleteController>('Apps.Core.Controllers.CommunityConfigurationDeleteController')
  router.delete('/v1/communityConfiguration/:id', (req: Request, res: Response) => controller.run(req, res))
}
