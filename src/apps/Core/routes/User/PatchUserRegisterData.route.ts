import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserRegisterDataPatchController } from '@Apps/Core/controllers/User/UserRegisterDataPatchController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserRegisterDataPatchController>('Apps.Core.Controllers.UserRegisterDataPatchController')
  router.patch('/v1/user/register-data/:id', (req: Request, res: Response) => controller.run(req, res))
}
