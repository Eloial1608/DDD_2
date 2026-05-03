import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserGetController } from '@Apps/Core/controllers/http/User/UserGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserGetController>('Apps.Core.Controllers.UserGetController')
  router.get('/v1/users/:id', (req: Request, res: Response) => controller.run(req, res))
}
