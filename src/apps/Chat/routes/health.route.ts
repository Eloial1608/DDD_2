import { Request, Response, Router } from 'express'
import DI from '@Apps/Chat/dependencyInjection/DI'
import { HealthGetController } from '@Apps/Chat/controllers/HealthGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<HealthGetController>('Apps.Chat.Controllers.HealthGetController')
  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
