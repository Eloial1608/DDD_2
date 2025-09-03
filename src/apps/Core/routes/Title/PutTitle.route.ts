import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TitlePutController } from '@Apps/Core/controllers/Title/TitlePutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TitlePutController>('Apps.Core.Controllers.TitlePutController')
  router.put('/v1/titles/:id', (req: Request, res: Response) => controller.run(req, res))
}
