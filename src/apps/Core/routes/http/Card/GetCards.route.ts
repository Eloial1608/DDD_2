import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CardsGetController } from '@Apps/Core/controllers/http/Card/CardsGetController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<CardsGetController>('Apps.Core.Controllers.CardsGetController')
  router.get('/v1/cards/me', middleware.run, (req: Request, res: Response) => controller.run(req, res))
}
