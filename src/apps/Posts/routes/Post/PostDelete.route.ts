import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { PostDeleteController } from '@Apps/Posts/controllers/Post/PostDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PostDeleteController>('Apps.Posts.Controllers.PostDeleteController')
  router.delete('/v1/posts/:id', (req: Request, res: Response) => controller.run(req, res))
}
