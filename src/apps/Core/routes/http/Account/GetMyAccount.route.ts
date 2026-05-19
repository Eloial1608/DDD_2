import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'
import { MyAccountGetController } from '@Apps/Core/controllers/http/Account/MyAccountGetController'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<MyAccountGetController>('Apps.Core.Controllers.MyAccountGetController')
  router.get('/v1/account/me', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}