import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPutController } from '@Apps/Core/controllers/http/User/UserPutController'

export const register = (router: Router) => {
  //const isAdminMiddleware = DI.getInstance().resolve<IsAdminMiddleware>('Apps.Core.Middleware.IsAdminMiddleware')
  const controller = DI.getInstance().resolve<UserPutController>('Apps.Core.Controllers.UserPutController')
  router.put('/v1/users/:id', (req: Request, res: Response) => controller.run(req, res))
}