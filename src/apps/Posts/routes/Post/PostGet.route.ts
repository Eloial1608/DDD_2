import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { PostGetController } from '@Apps/Posts/controllers/Post/PostGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PostGetController>('Apps.Posts.Controllers.PostGetController')
  router.get('/v1/posts/:id', (req: Request, res: Response) => controller.run(req, res))
}
