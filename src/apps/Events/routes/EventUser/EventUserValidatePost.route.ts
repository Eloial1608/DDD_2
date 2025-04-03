import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { EventUserValidatePostController } from '@Apps/Events/controllers/EventUser/EventUserValidatePostController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<EventUserValidatePostController>('Apps.EventUser.Controllers.EventUserValidatePostController')
  router.post('/v1/events/user/validate/:id', (req: Request, res: Response) => controller.run(req, res))
}
