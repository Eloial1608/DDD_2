import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CardPostController } from '@Apps/Core/controllers/http/Card/CardPostController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<CardPostController>('Apps.Core.Controllers.CardPostController')
  router.post('/v1/cards', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
