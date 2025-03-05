import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { MediaGetController } from '@Apps/Media/controllers/Media/MediaGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MediaGetController>('Apps.Media.Controllers.MediaGetController')
  router.get('/v1/media', (req: Request, res: Response) => controller.run(req, res))
}
