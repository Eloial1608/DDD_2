import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TitleDeleteController } from '@Apps/Core/controllers/Title/TitleDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TitleDeleteController>('Apps.Core.Controllers.TitleDeleteController')
  router.delete('/v1/titles/:id', (req: Request, res: Response) => controller.run(req, res))
}
