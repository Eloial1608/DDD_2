import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { RegisterPostController } from '@Apps/Core/controllers/http/User/RegisterPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<RegisterPostController>('Apps.Core.Controllers.RegisterPostController')
  router.post('/v1/users', (req: Request, res: Response) => controller.run(req, res))

}