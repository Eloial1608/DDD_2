import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { MediaPostController } from '@Apps/Media/controllers/Media/MediaPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MediaPostController>('Apps.Media.Controllers.MediaPostController')
  router.post('/v1/media/:id', (req: Request, res: Response) => controller.run(req, res))
}
