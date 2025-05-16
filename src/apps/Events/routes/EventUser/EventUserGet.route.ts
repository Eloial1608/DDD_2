import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventUserGetController } from '@Apps/Events/controllers/EventUser/EventUserGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventUserGetController>('Apps.EventUser.Controllers.EventUserGetController')
  router.get('/v1/events/user', (req: Request, res: Response) => controller.run(req, res))
}
