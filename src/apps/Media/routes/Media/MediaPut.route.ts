import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { MediaPutController } from '@Apps/Media/controllers/Media/MediaPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MediaPutController>('Apps.Media.Controllers.MediaPutController')
  router.put('/v1/media/:id', (req: Request, res: Response) => controller.run(req, res))
}
