import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { PostPostController } from '@Apps/Posts/controllers/Post/PostPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PostPostController>('Apps.Posts.Controllers.PostPostController')
  router.post('/v1/posts/:id', (req: Request, res: Response) => controller.run(req, res))
}
