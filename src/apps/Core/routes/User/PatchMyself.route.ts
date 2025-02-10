import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { MyselfPatchController } from '@Apps/Core/controllers/User/MyselfPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MyselfPatchController>('Apps.Core.Controllers.MyselfPatchController')
  router.patch('/v1/myself', (req: Request, res: Response) => controller.run(req, res))
}
