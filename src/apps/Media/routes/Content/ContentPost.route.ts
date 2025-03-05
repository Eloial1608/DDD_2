import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { ContentPostController } from '@Apps/Media/controllers/Content/ContentPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ContentPostController>('Apps.Media.Controllers.ContentPostController')
  router.post('/v1/content/:id', (req: Request, res: Response) => controller.run(req, res))
}
