import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { MediasGetController } from '@Apps/Media/controllers/Media/MediasGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MediasGetController>('Apps.Media.Controllers.MediasGetController')
  router.get('/v1/media', (req: Request, res: Response) => controller.run(req, res))
}
