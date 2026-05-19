import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { MyselfGetController } from '@Apps/Core/controllers/http/User/MyselfGetController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<MyselfGetController>('Apps.Core.Controllers.MyselfGetController')
  router.get('/v1/me', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
