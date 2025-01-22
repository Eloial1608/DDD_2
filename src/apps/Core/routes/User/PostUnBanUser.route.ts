import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UnBanUserPostController } from '@Apps/Core/controllers/User/UnBanUserPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UnBanUserPostController>('Apps.Core.Controllers.UnBanUserPostController')
  router.post('/v1/users/unban/:id', (req: Request, res: Response) => controller.run(req, res))
}
