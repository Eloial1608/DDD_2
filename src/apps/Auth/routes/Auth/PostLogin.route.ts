import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { LoginPostController } from '@Apps/Core/controllers/Auth/LoginPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LoginPostController>('Apps.Core.Controllers.LoginPostController')
  router.post('/v1/auth/login', (req: Request, res: Response) => controller.run(req, res))
}
