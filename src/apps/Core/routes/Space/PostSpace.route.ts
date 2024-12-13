import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { SpacesPostController } from '@Apps/Core/controllers/Space/SpacesPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<SpacesPostController>('Apps.Core.Controllers.SpacesPostController')
  router.post('/v1/spaces/:id', (req: Request, res: Response) => controller.run(req, res))
}
