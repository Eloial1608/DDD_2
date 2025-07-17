import { Request, Response, Router } from 'express'
import DI from '@Apps/Projects/dependencyInjection/DI'
import { ProjectGetController } from '@Apps/Events/controllers/Event/EventGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ProjectGetController>('Apps.Projects.Controllers.ProjectGetController')
  router.get('/v1/projects/:id', (req: Request, res: Response) => controller.run(req, res))
}
