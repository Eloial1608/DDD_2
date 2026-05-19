import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { LoginPostController } from '@Apps/Core/controllers/http/User/LoginPostController'

export const register = (router: Router) => {
const controller = DI.getInstance().resolve<LoginPostController>('Apps.Core.Controllers.LoginPostController')

  router.post('/v1/login', (req: Request, res: Response) => controller.run(req, res) )
}