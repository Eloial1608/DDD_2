import { Request, Response, Router } from 'express'
import DI from '@Apps/Events/dependencyInjection/DI'
import { TicketPutController } from '@Apps/Events/controllers/Ticket/TicketPutController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<TicketPutController>('Apps.Ticket.Controllers.TicketPutController')
  router.put('/v1/tickets/:id', (req: Request, res: Response) => controller.run(req, res))
}
