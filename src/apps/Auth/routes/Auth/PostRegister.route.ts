import { Request, Response, Router } from 'express'
import DI from '@Apps/Auth/dependencyInjection/DI'
import { RegisterPostController } from '@Apps/Auth/controllers/RegisterPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<RegisterPostController>('Apps.Auth.Controllers.RegisterPostController')
  router.post('/v1/auth/register/:id', (req: Request, res: Response) => controller.run(req, res))
}
