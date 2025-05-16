import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventMeetTokenGetController } from '@Apps/Events/controllers/Event/EventMeetTokenGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventMeetTokenGetController>('Apps.Event.Controllers.EventMeetTokenGetController')
  router.get('/v1/events/meet/token/:id', (req: Request, res: Response) => controller.run(req, res))
}
