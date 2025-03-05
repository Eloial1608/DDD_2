import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { ContentDeleteController } from '@Apps/Media/controllers/Content/ContentDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ContentDeleteController>('Apps.Media.Controllers.ContentDeleteController')
  router.delete('/v1/content/:id', (req: Request, res: Response) => controller.run(req, res))
}
