import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { MyselfRegisterDataPatchController } from '@Apps/Core/controllers/User/MyselfRegisterDataPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<MyselfRegisterDataPatchController>('Apps.Core.Controllers.MyselfRegisterDataPatchController')
  router.patch('/v1/myself/register-data/:communityId', (req: Request, res: Response) => controller.run(req, res))
}
