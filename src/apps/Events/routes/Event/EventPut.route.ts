import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventPutController } from '@Apps/Events/controllers/Event/EventPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventPutController>('Apps.Event.Controllers.EventPutController')
  router.put('/v1/events/:id', (req: Request, res: Response) => controller.run(req, res))
}
