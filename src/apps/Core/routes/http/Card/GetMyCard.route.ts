import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'
import { MyCardGetController } from 'src/apps/Core/controllers/http/Card/MyCardGetController'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<MyCardGetController>('Apps.Core.Controllers.MyCardGetController')
  router.get('/v1/card/me', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}