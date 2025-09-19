import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityConfigurationPutController } from '@Apps/Core/controllers/CommunityConfiguration/CommunityConfigurationPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityConfigurationPutController>('Apps.Core.Controllers.CommunityConfigurationPutController')
  router.put('/v1/communityConfiguration/:id', (req: Request, res: Response) => controller.run(req, res))
}
