import { Request, Response, Router } from 'express'
import DI from '@Apps/Projects/dependencyInjection/DI'
import { ProjectDeleteController } from '@Apps/Projects/controllers/Project/ProjectDeleteController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ProjectDeleteController>('Apps.Projects.Controllers.ProjectDeleteController')
  router.delete('/v1/projects/:id', (req: Request, res: Response) => controller.run(req, res))
}
