import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'
import { CardPinPutController } from 'src/apps/Core/controllers/http/Card/CardPinPutController'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<CardPinPutController>( 'Apps.Core.Controllers.CardPinPutController' )
  router.put('/v1/cards/cardPin/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res) )
}
