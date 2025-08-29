import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TitlePostController } from '@Apps/Core/controllers/Title/TitlePostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TitlePostController>('Apps.Core.Controllers.TitlePostController')
  router.post('/v1/titles/:id', (req: Request, res: Response) => controller.run(req, res))
}
