import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CardGetController } from '@Apps/Core/controllers/http/Card/CardGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CardGetController>('Apps.Core.Controllers.CardsGetController')
  router.get('/v1/Cards', (req: Request, res: Response) => controller.run(req, res))
}