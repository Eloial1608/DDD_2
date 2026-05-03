import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CardPostController } from '@Apps/Core/controllers/http/Card/CardPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CardPostController>('Apps.Core.Controllers.CardPostController')
  router.post('/v1/Card', (req: Request, res: Response) => controller.run(req, res))

}