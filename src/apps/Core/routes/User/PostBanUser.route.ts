import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { BanUserPostController } from '@Apps/Core/controllers/User/BanUserPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<BanUserPostController>('Apps.Core.Controllers.BanUserPostController')
  router.post('/v1/users/ban/:id', (req: Request, res: Response) => controller.run(req, res))
}
