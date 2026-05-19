import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CardDeleteController } from '@Apps/Core/controllers/http/Card/CardDeleteController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<CardDeleteController>('Apps.Core.Controllers.CardDeleteController')
  router.delete('/v1/cards/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
