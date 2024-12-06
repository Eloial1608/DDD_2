import { Request, Response, Router } from 'express'
import DI from '@Apps/Auth/dependencyInjection/DI'
import { LoginPostController } from '@Apps/Auth/controllers/LoginPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LoginPostController>('Apps.Auth.Controllers.LoginPostController')
  router.post('/v1/auth/login', (req: Request, res: Response) => controller.run(req, res))
}
