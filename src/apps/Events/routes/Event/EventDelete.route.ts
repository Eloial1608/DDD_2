import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventDeleteController } from '@Apps/Events/controllers/Event/EventDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventDeleteController>('Apps.Event.Controllers.EventDeleteController')
  router.delete('/v1/events/:id', (req: Request, res: Response) => controller.run(req, res))
}
