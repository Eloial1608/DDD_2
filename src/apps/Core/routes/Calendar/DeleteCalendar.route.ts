import { Request, Response, Router } from 'express'
import DI from '@Apps/Core/dependencyInjection/DI'
import { CalendarDeleteController } from '@Apps/Core/controllers/Calendar/CalendarDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<CalendarDeleteController>('Apps.Core.Controllers.CalendarDeleteController')
  router.delete('/v1/calendars/:id', (req: Request, res: Response) => controller.run(req, res))
}
