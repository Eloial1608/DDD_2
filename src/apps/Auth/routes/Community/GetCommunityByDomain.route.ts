import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CommunityByDomainGetController } from '@Apps/Core/controllers/Community/CommunityByDomainGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CommunityByDomainGetController>('Apps.Core.Controllers.CommunityByDomainGetController')
  router.get('/v1/communities/domain/:domain', (req: Request, res: Response) => controller.run(req, res))
}
