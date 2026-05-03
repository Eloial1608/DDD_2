import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CardDeleteController } from '@Apps/Core/controllers/http/Card/CardDeleteController'

export const register = (router: Router) => {
  //const isAdminMiddleware = DI.getInstance().resolve<IsAdminMiddleware>('Apps.Core.Middleware.IsAdminMiddleware')
  const controller = DI.getInstance().resolve<CardDeleteController>('Apps.Core.Controllers.CardDeleteController')
  router.delete('/v1/Cards/:id', (req: Request, res: Response) => controller.run(req, res))
}