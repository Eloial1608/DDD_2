import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventGetController } from '@Apps/Events/controllers/Event/EventGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventGetController>('Apps.Event.Controllers.EventGetController')
  router.get('/v1/events/:id', (req: Request, res: Response) => controller.run(req, res))
}
