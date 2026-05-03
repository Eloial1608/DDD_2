import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UsersGetController } from '@Apps/Core/controllers/http/User/UsersGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UsersGetController>('Apps.Core.Controllers.UsersGetController')
  router.get('/v1/users', (req: Request, res: Response) => controller.run(req, res))
}
