import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { UserPostController } from '@Apps/Core/controllers/User/UserPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<UserPostController>('Apps.Core.Controllers.UserPostController')
  router.post('/v1/users/:id', (req: Request, res: Response) => controller.run(req, res))
}
