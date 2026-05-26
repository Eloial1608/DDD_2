import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'
import { CardIsBlockedPutController } from 'src/apps/Core/controllers/http/Card/CardIsBlockedPutController'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<CardIsBlockedPutController>( 'Apps.Core.Controllers.CardIsBlockedPutController' )
  router.put('/v1/cards/isBlocked/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res) )
}