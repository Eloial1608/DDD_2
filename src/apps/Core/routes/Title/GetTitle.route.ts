import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TitleGetController } from '@Apps/Core/controllers/Title/TitleGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TitleGetController>('Apps.Core.Controllers.TitleGetController')
  router.get('/v1/titles/:id', (req: Request, res: Response) => controller.run(req, res))
}
