import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CalendarsGetController } from '@Apps/Core/controllers/Calendar/CalendarsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CalendarsGetController>('Apps.Core.Controllers.CalendarsGetController')
  router.get('/v1/calendars', (req: Request, res: Response) => controller.run(req, res))
}
