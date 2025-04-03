import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { TicketGetController } from '@Apps/Events/controllers/Ticket/TicketGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TicketGetController>('Apps.Ticket.Controllers.TicketGetController')
  router.get('/v1/tickets/:id', (req: Request, res: Response) => controller.run(req, res))
}
