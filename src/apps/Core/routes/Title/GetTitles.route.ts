import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TitlesGetController } from '@Apps/Core/controllers/Title/TitlesGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TitlesGetController>('Apps.Core.Controllers.TitlesGetController')
  router.get('/v1/titles', (req: Request, res: Response) => controller.run(req, res))
}
