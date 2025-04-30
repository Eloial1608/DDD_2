import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventPostController } from '@Apps/Events/controllers/Event/EventPostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventPostController>('Apps.Event.Controllers.EventPostController')
  router.post('/v1/events/:id', (req: Request, res: Response) => controller.run(req, res))
}
