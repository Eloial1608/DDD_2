import { Request, Response, Router } from 'express'
import DI from '@Apps/Posts/dependencyInjection/DI'
import { PostPutController } from '@Apps/Posts/controllers/Post/PostPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<PostPutController>('Apps.Posts.Controllers.PostPutController')
  router.put('/v1/posts/:id', (req: Request, res: Response) => controller.run(req, res))
}
