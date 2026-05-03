import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { MyselfGetController } from '@Apps/Core/controllers/http/User/MyselfGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MyselfGetController>('Apps.Core.Controllers.MyselfGetController')
  router.get('/v1/me/:communityId', (req: Request, res: Response) => controller.run(req, res))
}