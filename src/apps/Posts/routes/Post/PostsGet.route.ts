import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { PostsGetController } from '@Apps/Posts/controllers/Post/PostsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PostsGetController>('Apps.Posts.Controllers.PostsGetController')
  router.get('/v1/posts', (req: Request, res: Response) => controller.run(req, res))
}
