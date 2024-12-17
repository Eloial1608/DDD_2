import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { JoinSubCommunityPostController } from '@Apps/Core/controllers/User/JoinSubCommunityPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<JoinSubCommunityPostController>('Apps.Core.Controllers.JoinSubCommunityPostController')
  router.post('/v1/users/subcommunity/:id', (req: Request, res: Response) => controller.run(req, res))
}
