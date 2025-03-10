import { Request, Response, Router } from 'express'
import DI from '@Apps/Media/dependencyInjection/DI'
import { MediaDeleteController } from '@Apps/Media/controllers/Media/MediaDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MediaDeleteController>('Apps.Media.Controllers.MediaDeleteController')
  router.delete('/v1/media/:id', (req: Request, res: Response) => controller.run(req, res))
}
