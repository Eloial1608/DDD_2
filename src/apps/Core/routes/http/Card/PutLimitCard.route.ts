import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { LimitCardPutController } from '@Apps/Core/controllers/http/Card/LimitCardPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<LimitCardPutController>( 'Apps.Core.Controllers.LimitCardPutController' )
  router.put('/v1/cards/limit/:id', (req: Request, res: Response) => controller.run(req, res) )
}