import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventsGetController } from '@Apps/Events/controllers/Event/EventsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventsGetController>('Apps.Event.Controllers.EventsGetController')
  router.get('/v1/events', (req: Request, res: Response) => controller.run(req, res))
}
