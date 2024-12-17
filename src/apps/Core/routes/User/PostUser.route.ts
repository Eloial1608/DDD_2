import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UniqueUserPostController } from '@Apps/Core/controllers/User/UniqueUserPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UniqueUserPostController>('Apps.Core.Controllers.UniqueUserPostController')
  router.post('/v1/users/:id', (req: Request, res: Response) => controller.run(req, res))
}
