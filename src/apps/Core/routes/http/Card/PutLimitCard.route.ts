import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { LimitCardPutController } from '@Apps/Core/controllers/http/Card/LimitCardPutController'
import { AuthMiddleware } from '@Apps/Core/middleware/AuthMiddleware'

export const register = (router: Router) => {
  const middleware = DI.getInstance().resolve<AuthMiddleware>('Apps.Core.Middleware.AuthMiddleware')
  const controller = DI.getInstance().resolve<LimitCardPutController>( 'Apps.Core.Controllers.LimitCardPutController' )
  router.put('/v1/cards/limit/:id', middleware.run, (req: Request, res: Response) => controller.run(req, res) )
}
