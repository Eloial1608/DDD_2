import { Request, Response, Router } from 'express'
import DI from '@Apps/Projects/dependencyInjection/DI'
import { ProjectsGetController } from '@Apps/Projects/controllers/Project/ProjectsGetController'

export const register = (router: Router) => {
  const controller = DI.getInstance().resolve<ProjectsGetController>('Apps.Projects.Controllers.ProjectsGetController')
  router.get('/v1/projects', (req: Request, res: Response) => controller.run(req, res))
}
