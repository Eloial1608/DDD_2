import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { TitlePatchController } from '@Apps/Core/controllers/Title/TitlePatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TitlePatchController>('Apps.Core.Controllers.TitlePatchController')
  router.patch('/v1/titles/:id', (req: Request, res: Response) => controller.run(req, res))
}
