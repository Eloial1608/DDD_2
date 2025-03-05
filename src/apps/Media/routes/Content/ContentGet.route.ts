import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { ContentGetController } from '@Apps/Media/controllers/Content/ContentGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ContentGetController>('Apps.Media.Controllers.ContentGetController')
  router.get('/v1/content', (req: Request, res: Response) => controller.run(req, res))
}
