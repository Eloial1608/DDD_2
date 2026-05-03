import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CardPutController } from '@Apps/Core/controllers/http/Card/CardPutController'

export const register = (router: Router) => {
  //const isAdminMiddleware = DI.getInstance().resolve<IsAdminMiddleware>('Apps.Core.Middleware.IsAdminMiddleware')
  const controller = DI.getInstance().resolve<CardPutController>('Apps.Core.Controllers.CardPutController')
  router.put('/v1/Cards/:id', (req: Request, res: Response) => controller.run(req, res))
}